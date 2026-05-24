using System.Globalization;
using System.Security.Claims;
using ChemistryV1.Models;
using ChemistryV1.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChemistryV1.Controllers;

[Authorize]
public class AchievementsController : Controller
{
    private readonly ElearningDbContext _context;

    public AchievementsController(ElearningDbContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index()
    {
        var userIdValue = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdValue, out var userId) || userId <= 0)
        {
            return RedirectToAction("Login", "Account");
        }

        var currentUser = await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == userId && u.IsActive == true);

        if (currentUser == null)
        {
            return RedirectToAction("Login", "Account");
        }

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

        var quizScores = await _context.QuizResults
            .AsNoTracking()
            .Where(q => q.StudentId == userId)
            .Select(q => q.Score ?? 0)
            .ToListAsync();

        var averageQuizScore = quizScores.Count > 0 ? quizScores.Average() : 0;

        var quizDates = await _context.QuizResults
            .AsNoTracking()
            .Where(q => q.StudentId == userId && q.CompletedAt != null)
            .Select(q => q.CompletedAt!.Value)
            .ToListAsync();

        var lessonDates = await _context.UserLessonProgresses
            .AsNoTracking()
            .Where(p => p.UserId == userId && p.IsCompleted == true && p.CompletedAt != null)
            .Select(p => p.CompletedAt!.Value)
            .ToListAsync();

        var activityDates = new HashSet<DateOnly>();
        foreach (var activity in quizDates.Concat(lessonDates))
        {
            activityDates.Add(DateOnly.FromDateTime(activity.Date));
        }

        var dayStreak = 0;
        var cursor = DateOnly.FromDateTime(DateTime.Today);
        while (activityDates.Contains(cursor))
        {
            dayStreak++;
            cursor = cursor.AddDays(-1);
        }

        var activeMissions = await _context.SystemMissions
            .AsNoTracking()
            .Where(m => m.IsActive)
            .OrderBy(m => m.SortOrder)
            .ToListAsync();

        int ResolveMissionProgress(SystemMission mission)
        {
            return mission.MetricKey.ToLowerInvariant() switch
            {
                "lessons_completed" => totalCompletedLessons,
                "quizzes_completed" => totalQuizResults,
                "streak_days" => dayStreak,
                "enrollments_count" => totalEnrollments,
                "xp_total" => totalXp,
                _ => 0
            };
        }

        var missionProgressPercents = activeMissions
            .Select(mission =>
            {
                if (mission.TargetValue <= 0)
                {
                    return 0;
                }

                var progress = ResolveMissionProgress(mission) * 100.0 / mission.TargetValue;
                return Math.Clamp((int)Math.Round(progress), 0, 100);
            })
            .ToList();

        var totalMissions = activeMissions.Count;
        var completedMissions = missionProgressPercents.Count(percent => percent >= 100);
        var missionCompletionRate = missionProgressPercents.Count > 0
            ? (int)Math.Round(missionProgressPercents.Average())
            : 0;

        var estimatedStudyMinutes = (totalCompletedLessons * 22) + (totalQuizResults * 12) + (totalEnrollments * 6);
        var activeDaysTotal = Math.Max(1, activityDates.Count);
        var averageStudyMinutesPerDay = (int)Math.Round(estimatedStudyMinutes / (double)activeDaysTotal);
        var activeDaysLast7 = Enumerable.Range(0, 7)
            .Count(offset => activityDates.Contains(DateOnly.FromDateTime(DateTime.Today.AddDays(-offset))));

        var viCulture = new CultureInfo("vi-VN");
        var patternPoints = new List<AchievementPatternPointViewModel>();
        for (var i = 6; i >= 0; i--)
        {
            var day = DateTime.Today.AddDays(-i).Date;
            var activityCount =
                quizDates.Count(d => d.Date == day) +
                lessonDates.Count(d => d.Date == day);

            patternPoints.Add(new AchievementPatternPointViewModel
            {
                DayLabel = day.ToString("ddd", viCulture),
                ActivityCount = activityCount
            });
        }

        var formulaSkill = Math.Clamp(40 + (totalCompletedLessons * 6), 0, 100);
        var reactionSkill = Math.Clamp((int)Math.Round(averageQuizScore * 0.9), 0, 100);
        var missionSkill = Math.Clamp(missionCompletionRate, 0, 100);
        var consistencySkill = Math.Clamp(30 + (dayStreak * 12), 0, 100);

        var strengths = new List<AchievementInsightItemViewModel>
        {
            new()
            {
                Title = "Tư duy công thức",
                Detail = "Khả năng theo dõi và áp dụng công thức trong bài học.",
                ScorePercent = formulaSkill,
                Tone = "primary"
            },
            new()
            {
                Title = "Kỷ luật học tập",
                Detail = "Duy trì streak và tần suất học đều trong tuần.",
                ScorePercent = consistencySkill,
                Tone = "secondary"
            }
        };

        var weaknesses = new List<AchievementInsightItemViewModel>
        {
            new()
            {
                Title = "Độ sâu làm quiz",
                Detail = "Cần tăng điểm quiz trung bình để ổn định hơn.",
                ScorePercent = Math.Clamp(100 - reactionSkill, 0, 100),
                Tone = "tertiary"
            },
            new()
            {
                Title = "Tiến độ mission",
                Detail = "Một số mission chưa hoàn tất đúng mục tiêu.",
                ScorePercent = Math.Clamp(100 - missionCompletionRate, 0, 100),
                Tone = "outline"
            }
        };

        string ToLevelText(int value)
        {
            return value switch
            {
                >= 85 => "Expert",
                >= 70 => "Advanced",
                >= 50 => "Developing",
                _ => "Basic"
            };
        }

        var skills = new List<AchievementSkillItemViewModel>
        {
            new()
            {
                Name = "Mastery công thức",
                Icon = "functions",
                ProgressPercent = formulaSkill,
                LevelText = ToLevelText(formulaSkill),
                Tone = "primary"
            },
            new()
            {
                Name = "Phản xạ bài quiz",
                Icon = "quiz",
                ProgressPercent = reactionSkill,
                LevelText = ToLevelText(reactionSkill),
                Tone = "secondary"
            },
            new()
            {
                Name = "Hoàn thành mission",
                Icon = "task_alt",
                ProgressPercent = missionSkill,
                LevelText = ToLevelText(missionSkill),
                Tone = "tertiary"
            },
            new()
            {
                Name = "Nhịp học ổn định",
                Icon = "timeline",
                ProgressPercent = consistencySkill,
                LevelText = ToLevelText(consistencySkill),
                Tone = "outline"
            }
        };

        var aiAnalysis =
            $"Bạn đang giữ hiệu suất mission ở mức {missionCompletionRate}% với streak {dayStreak} ngày. " +
            $"Điểm quiz trung bình hiện tại là {Math.Round(averageQuizScore, 1)}. " +
            "Xu hướng học tập cho thấy bạn hoạt động tốt hơn vào các ngày có lịch học đều, vì vậy hãy giữ nhịp học liên tục để tăng tốc độ tiến bộ.";

        var nextRecommendation =
            missionCompletionRate < 70
                ? "Ưu tiên hoàn thành các mission chưa đạt, đặc biệt nhóm quiz và streak để cải thiện tổng tiến độ tuần."
                : "Giữ nhịp hiện tại và tăng độ khó quiz thêm 1 mức để nâng chất lượng kiến thức.";

        var viewModel = new AchievementDashboardViewModel
        {
            UserName = currentUser.FullName ?? currentUser.Username ?? "Learner",
            Role = currentUser.Role ?? "Student",
            AvatarUrl = currentUser.AvatarUrl ?? "https://via.placeholder.com/120",
            MissionCompletionRate = missionCompletionRate,
            CompletedMissions = completedMissions,
            TotalMissions = totalMissions,
            TotalCompletedLessons = totalCompletedLessons,
            TotalQuizResults = totalQuizResults,
            DayStreak = dayStreak,
            TotalXp = totalXp,
            EstimatedStudyMinutes = estimatedStudyMinutes,
            AverageStudyMinutesPerDay = averageStudyMinutesPerDay,
            ActiveDaysLast7 = activeDaysLast7,
            Strengths = strengths,
            Weaknesses = weaknesses,
            Skills = skills,
            LearningPattern = patternPoints,
            AiAnalysis = aiAnalysis,
            NextRecommendation = nextRecommendation
        };

        return View(viewModel);
    }
}
