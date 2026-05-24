using System.Security.Claims;
using ChemistryV1.Models;
using ChemistryV1.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChemistryV1.Controllers;

[Authorize]
public class ProfileController : Controller
{
    private readonly ElearningDbContext _context;

    public ProfileController(ElearningDbContext context)
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

        var currentUser = await _context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == userId && u.IsActive == true);
        if (currentUser == null)
        {
            return RedirectToAction("Login", "Account");
        }

        var totalCompletedLessons = await _context.UserLessonProgresses
            .CountAsync(p => p.UserId == userId && p.IsCompleted == true);

        var totalQuizResults = await _context.QuizResults.CountAsync(q => q.StudentId == userId);

        var totalEnrollments = await _context.CourseEnrollments.CountAsync(e => e.StudentId == userId);

        var totalXp = currentUser.Xp;
        var totalScore = currentUser.Score;
        var completedMissions = currentUser.CompletedMissions;

        var activityDates = new HashSet<DateOnly>();
        var quizDates = await _context.QuizResults
            .Where(q => q.StudentId == userId && q.CompletedAt != null)
            .Select(q => q.CompletedAt!.Value)
            .ToListAsync();

        var lessonDates = await _context.UserLessonProgresses
            .Where(p => p.UserId == userId && p.IsCompleted == true && p.CompletedAt != null)
            .Select(p => p.CompletedAt!.Value)
            .ToListAsync();

        foreach (var date in quizDates.Concat(lessonDates))
        {
            activityDates.Add(DateOnly.FromDateTime(date.Date));
        }

        var dayStreak = 0;
        var cursor = DateOnly.FromDateTime(DateTime.Today);
        while (activityDates.Contains(cursor))
        {
            dayStreak++;
            cursor = cursor.AddDays(-1);
        }

        const int xpPerLevel = 180;
        var level = Math.Max(1, currentUser.Level);
        var currentLevelXp = Math.Max(0, totalXp - ((level - 1) * xpPerLevel));
        var nextLevelXp = level * xpPerLevel;
        var xpToNext = Math.Max(0, nextLevelXp - totalXp);
        var levelProgressPercent = Math.Clamp((int)Math.Round((currentLevelXp / (double)xpPerLevel) * 100), 0, 100);

        var recentQuizResults = await _context.QuizResults
            .AsNoTracking()
            .Include(q => q.Revision)
                .ThenInclude(r => r!.Course)
            .Where(q => q.StudentId == userId)
            .OrderByDescending(q => q.CompletedAt)
            .Take(2)
            .ToListAsync();

        var recentProgress = await _context.UserLessonProgresses
            .AsNoTracking()
            .Include(p => p.Lesson)
            .Where(p => p.UserId == userId && p.IsCompleted == true)
            .OrderByDescending(p => p.CompletedAt)
            .Take(2)
            .ToListAsync();

        var recentActivity = new List<UserProfileActivityViewModel>();
        recentActivity.AddRange(recentProgress.Select(p => new UserProfileActivityViewModel
        {
            Title = $"Completed lesson - {p.Lesson?.Title ?? "Practice"}",
            TimeLabel = p.CompletedAt?.ToString("g") ?? "Recently",
            Icon = "menu_book",
            Tone = "primary"
        }));
        recentActivity.AddRange(recentQuizResults.Select(q => new UserProfileActivityViewModel
        {
            Title = $"Completed quiz - {q.Revision?.Course?.Title ?? "ChemLab Quiz"}",
            TimeLabel = q.CompletedAt?.ToString("g") ?? "Recently",
            Icon = "fact_check",
            Tone = "secondary"
        }));
        recentActivity = recentActivity.Take(3).ToList();

        var badges = new List<UserProfileBadgeViewModel>
        {
            new() { Title = "Fast Learner", Icon = "bolt", Tone = "tertiary", Earned = totalCompletedLessons > 0 },
            new() { Title = "Flame Tester", Icon = "local_fire_department", Tone = "secondary", Earned = totalQuizResults > 0 },
            new() { Title = "Molecule Master", Icon = "hub", Tone = "primary", Earned = totalXp >= 500 },
            new() { Title = "Bio-Hazard", Icon = "biotech", Tone = "outline", Earned = totalXp >= 1000 },
            new() { Title = "Lab Assistant", Icon = "medical_services", Tone = "outline", Earned = totalCompletedLessons >= 10 }
        };

        var skills = new List<UserProfileSkillViewModel>
        {
            new()
            {
                Name = "Formula Proficiency",
                Icon = "function",
                ProgressPercent = Math.Clamp(45 + (totalCompletedLessons * 5), 0, 100),
                ValueLabel = $"{Math.Clamp(45 + (totalCompletedLessons * 5), 0, 100)}%",
                Tone = "primary"
            },
            new()
            {
                Name = "Reaction ID",
                Icon = "timer",
                ProgressPercent = Math.Clamp(40 + (totalQuizResults * 6), 0, 100),
                ValueLabel = totalQuizResults > 0 ? "2.8s" : "--",
                Tone = "secondary"
            },
            new()
            {
                Name = "Flash Quiz Mastery",
                Icon = "quiz",
                ProgressPercent = Math.Clamp(30 + (totalQuizResults * 8), 0, 100),
                ValueLabel = totalQuizResults >= 5 ? "Expert" : "Developing",
                Tone = "tertiary"
            }
        };

        var unlockedElements = Math.Clamp((totalCompletedLessons / 2) + (totalQuizResults / 3), 0, 7);
        var elementCatalog = new List<(string Symbol, string Name, string Tone)>
        {
            ("H", "Hydrogen", "primary"),
            ("He", "Helium", "primary"),
            ("Li", "Lithium", "tertiary"),
            ("Be", "Beryllium", "secondary"),
            ("B", "Boron", "outline"),
            ("C", "Carbon", "outline"),
            ("N", "Nitrogen", "outline")
        };

        var elements = elementCatalog
            .Select((item, index) => new UserProfileElementViewModel
            {
                Symbol = item.Symbol,
                Name = item.Name,
                Tone = item.Tone,
                Unlocked = index < unlockedElements
            })
            .ToList();

        var roadmapSteps = new List<UserProfileRoadmapStepViewModel>
        {
            new() { Title = "Fundamentals", Subtitle = "Completed 100%", Icon = "check_circle", State = "done" },
            new() { Title = "Reaction Dynamics", Subtitle = "Current Module", Icon = "science", State = "active" },
            new() { Title = "Organic Compounds", Subtitle = "Unlocks at Level 18", Icon = "lock", State = "locked" },
            new() { Title = "Quantum Bonding", Subtitle = "Unlocks at Level 25", Icon = "lock", State = "locked" }
        };

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

        var missions = activeMissions.Select(mission => new UserProfileMissionViewModel
        {
            Id = mission.Id,
            Title = mission.Title,
            RewardText = mission.RewardText,
            Icon = mission.Icon,
            Tone = mission.ColorClass,
            Current = ResolveMissionProgress(mission),
            Target = mission.TargetValue,
            ProgressPercent = mission.TargetValue <= 0 ? 0 : Math.Min(100, (int)Math.Round(ResolveMissionProgress(mission) * 100.0 / mission.TargetValue)),
            Completed = ResolveMissionProgress(mission) >= mission.TargetValue
        }).ToList();

        var viewModel = new UserProfileViewModel
        {
            UserName = currentUser.FullName ?? currentUser.Username ?? "Alchemist",
            Role = currentUser.Role ?? "Student",
            AvatarUrl = currentUser.AvatarUrl ?? "https://via.placeholder.com/150",
            Level = level,
            TotalXp = totalXp,
            CurrentLevelXp = currentLevelXp,
            NextLevelXp = nextLevelXp,
            XpToNextLevel = xpToNext,
            LevelProgressPercent = levelProgressPercent,
            TotalCompletedLessons = totalCompletedLessons,
            TotalQuizResults = totalQuizResults,
            DayStreak = dayStreak,
            Badges = badges,
            Skills = skills,
            Elements = elements,
            RecentActivity = recentActivity,
            Missions = missions,
            RoadmapSteps = roadmapSteps
        };

        return View(viewModel);
    }
}
