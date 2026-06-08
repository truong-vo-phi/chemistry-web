using ChemistryV1.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;

namespace ChemistryV1.Controllers.Api;

[Route("api/progression")]
[ApiController]
[Authorize]
public class ProgressionController : ControllerBase
{
    private readonly ElearningDbContext _context;

    public ProgressionController(ElearningDbContext context)
    {
        _context = context;
    }

    public class MissionCompletionRequest
    {
        public int MissionId { get; set; }
    }

    public class GameplayResultRequest
    {
        public int Score { get; set; }
        public int Xp { get; set; }
        public int CompletionTime { get; set; }
        public string? MissionStatus { get; set; }
        public int? MissionId { get; set; }
    }

    [HttpPost("gameplay-result")]
    public async Task<IActionResult> RecordGameplayResult([FromBody] GameplayResultRequest request)
    {
        var userId = GetUserId();
        if (userId == null)
            return Unauthorized();

        if (request.Score < 0 || request.Xp < 0 || request.CompletionTime < 0)
        {
            return BadRequest(new { success = false, message = "Giá trị kết quả gameplay không hợp lệ." });
        }

        var user = await _context.Users.FindAsync(userId.Value);
        if (user == null)
            return NotFound(new { success = false, message = "Không tìm thấy người dùng." });

        var gameplayResult = new GameplayResult
        {
            UserId = userId.Value,
            Score = request.Score,
            Xp = request.Xp,
            CompletionTime = request.CompletionTime,
            MissionStatus = request.MissionStatus,
            CreatedAt = DateTime.UtcNow
        };

        _context.GameplayResults.Add(gameplayResult);

        if (request.MissionId.HasValue && string.Equals(request.MissionStatus, "completed", StringComparison.OrdinalIgnoreCase))
        {
            var mission = await _context.SystemMissions.FindAsync(request.MissionId.Value);
            if (mission != null)
            {
                var existingCompletion = await _context.UserMissionProgresses.FindAsync(userId.Value, request.MissionId.Value);
                if (existingCompletion == null)
                {
                    _context.UserMissionProgresses.Add(new UserMissionProgress
                    {
                        UserId = userId.Value,
                        MissionId = mission.Id,
                        CompletedAt = DateTime.UtcNow
                    });
                }
            }
        }

        await _context.SaveChangesAsync();
        var response = await SyncUserStats(userId.Value);
        return Ok(new { success = true, gameplayResultId = gameplayResult.Id, user = response });
    }

    [HttpPost("complete-mission")]
    public async Task<IActionResult> CompleteMission([FromBody] MissionCompletionRequest request)
    {
        var userId = GetUserId();
        if (userId == null)
            return Unauthorized();

        var mission = await _context.SystemMissions.FindAsync(request.MissionId);
        if (mission == null)
            return NotFound(new { success = false, message = "Không tìm thấy nhiệm vụ." });

        var currentProgress = await ResolveMissionProgress(userId.Value, mission);
        if (currentProgress < mission.TargetValue)
            return BadRequest(new { success = false, message = "Mục tiêu nhiệm vụ chưa đạt được." });

        var existingCompletion = await _context.UserMissionProgresses.FindAsync(userId.Value, request.MissionId);
        if (existingCompletion != null)
        {
            var userData = await SyncUserStats(userId.Value);
            return Ok(new { success = true, alreadyCompleted = true, user = userData });
        }

        _context.UserMissionProgresses.Add(new UserMissionProgress
        {
            UserId = userId.Value,
            MissionId = mission.Id,
            CompletedAt = DateTime.Now
        });

        await _context.SaveChangesAsync();
        var response = await SyncUserStats(userId.Value);
        return Ok(new { success = true, alreadyCompleted = false, user = response });
    }

    [HttpPost("sync")]
    public async Task<IActionResult> SyncProgress()
    {
        var userId = GetUserId();
        if (userId == null)
            return Unauthorized();

        var response = await SyncUserStats(userId.Value);
        if (response == null)
            return NotFound(new { success = false, message = "Không tìm thấy người dùng." });

        return Ok(new { success = true, user = response });
    }

    private int? GetUserId()
    {
        var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (int.TryParse(userIdString, out var id))
            return id;

        return null;
    }

    private async Task<ProgressSyncResponse?> SyncUserStats(int userId)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null)
            return null;

        var totalCompletedLessons = await _context.UserLessonProgresses
            .CountAsync(p => p.UserId == userId && p.IsCompleted == true);

        var totalXpFromQuizzes = await _context.QuizResults
            .Where(q => q.StudentId == userId)
            .SumAsync(q => (double?)q.Score) ?? 0;

        var missionXpBonus = await _context.UserMissionProgresses
            .Where(p => p.UserId == userId)
            .Include(p => p.Mission)
            .Select(p => p.Mission!.RewardText)
            .ToListAsync();

        var missionXpTotal = missionXpBonus.Sum(ParseXpReward);
        var gameplayXp = await _context.GameplayResults
            .Where(g => g.UserId == userId)
            .SumAsync(g => (double?)g.Xp) ?? 0;

        var streak = await ResolveUserStreak(userId);
        var completedMissions = await _context.UserMissionProgresses
            .CountAsync(p => p.UserId == userId);

        user.Xp = (int)Math.Round(totalXpFromQuizzes) + (totalCompletedLessons * 50) + missionXpTotal + (int)Math.Round(gameplayXp);
        user.Level = Math.Max(1, user.Xp / 180 + 1);
        user.Streak = streak;
        user.CompletedMissions = completedMissions;
        user.Score = user.Xp + completedMissions * 30 + streak * 15;

        await _context.SaveChangesAsync();

        return new ProgressSyncResponse
        {
            Xp = user.Xp,
            Level = user.Level,
            Streak = user.Streak,
            CompletedMissions = user.CompletedMissions,
            Score = user.Score
        };
    }

    private async Task<int> ResolveMissionProgress(int userId, SystemMission mission)
    {
        var totalCompletedLessons = await _context.UserLessonProgresses
            .CountAsync(p => p.UserId == userId && p.IsCompleted == true);

        var totalQuizResults = await _context.QuizResults
            .CountAsync(q => q.StudentId == userId);

        var totalEnrollments = await _context.CourseEnrollments
            .CountAsync(e => e.StudentId == userId);

        var totalXpFromQuizzes = await _context.QuizResults
            .Where(q => q.StudentId == userId)
            .SumAsync(q => (double?)q.Score) ?? 0;

        var totalXp = (int)Math.Round(totalXpFromQuizzes) + (totalCompletedLessons * 50);
        var streak = await ResolveUserStreak(userId);

        return mission.MetricKey.ToLowerInvariant() switch
        {
            "lessons_completed" => totalCompletedLessons,
            "quizzes_completed" => totalQuizResults,
            "streak_days" => streak,
            "enrollments_count" => totalEnrollments,
            "xp_total" => totalXp,
            _ => 0
        };
    }

    private async Task<int> ResolveUserStreak(int userId)
    {
        var activityDates = new HashSet<DateOnly>();

        var quizDates = await _context.QuizResults
            .Where(q => q.StudentId == userId && q.CompletedAt != null)
            .Select(q => q.CompletedAt!.Value.Date)
            .Distinct()
            .ToListAsync();

        var lessonDates = await _context.UserLessonProgresses
            .Where(p => p.UserId == userId && p.IsCompleted == true && p.CompletedAt != null)
            .Select(p => p.CompletedAt!.Value.Date)
            .Distinct()
            .ToListAsync();

        foreach (var date in quizDates.Concat(lessonDates))
            activityDates.Add(DateOnly.FromDateTime(date));

        var dayStreak = 0;
        var cursor = DateOnly.FromDateTime(DateTime.Today);
        while (activityDates.Contains(cursor))
        {
            dayStreak++;
            cursor = cursor.AddDays(-1);
        }

        return dayStreak;
    }

    private static int ParseXpReward(string? rewardText)
    {
        if (string.IsNullOrWhiteSpace(rewardText))
            return 0;

        var digits = new string(rewardText.Where(char.IsDigit).ToArray());
        return int.TryParse(digits, out var value) ? value : 0;
    }

    public class ProgressSyncResponse
    {
        public int Xp { get; set; }
        public int Level { get; set; }
        public int Streak { get; set; }
        public int CompletedMissions { get; set; }
        public int Score { get; set; }
    }
}
