using System.Diagnostics;
using System.Security.Claims;
using ChemistryV1.Models;
using ChemistryV1.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChemistryV1.Controllers
{
    public class HomeController : Controller
    {
        private readonly ElearningDbContext _context;
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger, ElearningDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [Authorize]
        public async Task<IActionResult> Index()
        {
            var userIdValue = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userId = int.TryParse(userIdValue, out var parsedUserId) ? parsedUserId : 0;

            var currentUser = userId > 0
                ? await _context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == userId)
                : null;

            var totalStudents = await _context.Users.CountAsync(u => u.Role == "Student");
            var totalCourses = await _context.Courses.CountAsync();
            var totalLessons = await _context.Lessons.CountAsync();
            var totalCategories = await _context.Categories.CountAsync();
            var totalQuizResults = await _context.QuizResults.CountAsync();
            var totalCompletedLessons = userId > 0
                ? await _context.UserLessonProgresses.CountAsync(p => p.UserId == userId && p.IsCompleted == true)
                : 0;
            var totalEnrollments = userId > 0
                ? await _context.CourseEnrollments.CountAsync(e => e.StudentId == userId)
                : 0;

            var totalXpFromQuizzes = userId > 0
                ? await _context.QuizResults.Where(q => q.StudentId == userId).SumAsync(q => (double?)q.Score) ?? 0
                : 0;
            var totalXp = (int)Math.Round(totalXpFromQuizzes) + (totalCompletedLessons * 50);

            var activityDates = new HashSet<DateOnly>();
            if (userId > 0)
            {
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
            }

            var dayStreak = 0;
            var cursor = DateOnly.FromDateTime(DateTime.Today);
            while (activityDates.Contains(cursor))
            {
                dayStreak++;
                cursor = cursor.AddDays(-1);
            }

            var recentCourses = await _context.Courses
                .AsNoTracking()
                .Include(c => c.Teacher)
                .Include(c => c.Chapters)
                    .ThenInclude(ch => ch.Lessons)
                .OrderByDescending(c => c.CreatedAt)
                .Take(3)
                .ToListAsync();

            var recentLessons = await _context.Lessons
                .AsNoTracking()
                .Include(l => l.Chapter)
                .ThenInclude(ch => ch.Course)
                .OrderByDescending(l => l.CreatedAt)
                .Take(3)
                .ToListAsync();

            var recentNews = await _context.News
                .AsNoTracking()
                .OrderByDescending(n => n.CreatedAt)
                .Take(3)
                .ToListAsync();

            var recentQuizResults = userId > 0
                ? await _context.QuizResults
                    .AsNoTracking()
                    .Include(q => q.Revision)
                    .ThenInclude(r => r.Course)
                    .Where(q => q.StudentId == userId)
                    .OrderByDescending(q => q.CompletedAt)
                    .Take(3)
                    .ToListAsync()
                : new List<QuizResult>();

            var recentProgress = userId > 0
                ? await _context.UserLessonProgresses
                    .AsNoTracking()
                    .Include(p => p.Lesson)
                    .ThenInclude(l => l.Chapter)
                    .ThenInclude(ch => ch.Course)
                    .Where(p => p.UserId == userId && p.IsCompleted == true)
                    .OrderByDescending(p => p.CompletedAt)
                    .Take(3)
                    .ToListAsync()
                : new List<UserLessonProgress>();

            var recentEnrollments = userId > 0
                ? await _context.CourseEnrollments
                    .AsNoTracking()
                    .Include(e => e.Course)
                    .ThenInclude(c => c.Teacher)
                    .Where(e => e.StudentId == userId)
                    .OrderByDescending(e => e.EnrolledAt)
                    .Take(3)
                    .ToListAsync()
                : new List<CourseEnrollment>();

            var continueCourseSource = recentProgress.FirstOrDefault()?.Lesson?.Chapter?.Course
                ?? recentEnrollments.FirstOrDefault()?.Course;

            HomeCourseCardViewModel? continueCourse = null;
            if (continueCourseSource != null)
            {
                // Calculate progress based on completed lessons in this specific course
                var courseLessons = await _context.Lessons
                    .AsNoTracking()
                    .Include(l => l.Chapter)
                    .Where(l => l.Chapter != null && l.Chapter.CourseId == continueCourseSource.Id)
                    .ToListAsync();

                var totalLessonsInCourse = courseLessons.Count;
                var completedLessonsInCourse = 0;

                if (userId > 0 && totalLessonsInCourse > 0)
                {
                    var completedLessonIdsInCourse = await _context.UserLessonProgresses
                        .AsNoTracking()
                        .Where(p => p.UserId == userId && p.IsCompleted == true)
                        .Select(p => p.LessonId)
                        .ToListAsync();

                    completedLessonsInCourse = courseLessons.Count(l => completedLessonIdsInCourse.Contains(l.Id));
                }

                var progressPercent = totalLessonsInCourse > 0
                    ? (int)Math.Round((double)completedLessonsInCourse / totalLessonsInCourse * 100)
                    : 0;

                continueCourse = new HomeCourseCardViewModel
                {
                    Id = continueCourseSource.Id,
                    Title = continueCourseSource.Title ?? "Khóa học mới",
                    Description = continueCourseSource.Description,
                    ThumbnailUrl = continueCourseSource.ThumbnailUrl,
                    TeacherName = continueCourseSource.Teacher?.FullName ?? continueCourseSource.Teacher?.Username,
                    Status = continueCourseSource.Status,
                    CreatedAt = continueCourseSource.CreatedAt,
                    ProgressPercent = progressPercent
                };
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

            var missions = activeMissions.Any()
                ? activeMissions.Select(mission => new HomeMissionCardViewModel
                {
                    Title = mission.Title,
                    RewardText = mission.RewardText,
                    Current = ResolveMissionProgress(mission),
                    Target = mission.TargetValue,
                    Icon = mission.Icon,
                    ColorClass = mission.ColorClass
                }).ToList()
                : new List<HomeMissionCardViewModel>
                {
                    new()
                    {
                        Title = "Hoàn thành 3 bài học",
                        RewardText = "+150 XP Reward",
                        Current = totalCompletedLessons,
                        Target = 3,
                        Icon = "check",
                        ColorClass = "secondary"
                    },
                    new()
                    {
                        Title = "Làm 5 bài quiz",
                        RewardText = "+200 XP Reward",
                        Current = totalQuizResults,
                        Target = 5,
                        Icon = "radio_button_unchecked",
                        ColorClass = "primary"
                    },
                    new()
                    {
                        Title = "Giữ streak 3 ngày",
                        RewardText = "+250 XP Reward",
                        Current = dayStreak,
                        Target = 3,
                        Icon = "local_fire_department",
                        ColorClass = "tertiary"
                    }
                };

            var achievements = new List<HomeAchievementCardViewModel>
            {
                new() { Title = "Fast Learner", Tier = "Common", Icon = "bolt", ColorClass = "tertiary", Earned = totalCompletedLessons > 0 },
                new() { Title = "Quiz Tester", Tier = "Rare", Icon = "local_fire_department", ColorClass = "primary", Earned = totalQuizResults > 0 },
                new() { Title = "Course Explorer", Tier = "Epic", Icon = "eco", ColorClass = "secondary", Earned = totalEnrollments > 0 },
                new() { Title = "Streak Keeper", Tier = "Locked", Icon = "lock", ColorClass = "outline", Earned = dayStreak >= 3 }
            };

            var activity = new List<HomeActivityItemViewModel>();

            activity.AddRange(recentQuizResults.Select(result => new HomeActivityItemViewModel
            {
                Title = $"Completed quiz{(result.Revision?.Course?.Title is null ? string.Empty : $" - {result.Revision.Course.Title}")}",
                Detail = $"{(result.CompletedAt ?? DateTime.Now):g} • {Math.Round(result.Score ?? 0)} XP",
                Icon = "check_circle",
                ColorClass = "secondary",
                HappenedAt = result.CompletedAt
            }));

            activity.AddRange(recentProgress.Select(progress => new HomeActivityItemViewModel
            {
                Title = $"Completed lesson{(progress.Lesson?.Title is null ? string.Empty : $" - {progress.Lesson.Title}")}",
                Detail = $"{(progress.CompletedAt ?? DateTime.Now):g} • lesson progress",
                Icon = "play_arrow",
                ColorClass = "primary",
                HappenedAt = progress.CompletedAt
            }));

            activity.AddRange(recentEnrollments.Select(enrollment => new HomeActivityItemViewModel
            {
                Title = $"Enrolled course - {enrollment.Course?.Title}",
                Detail = $"{(enrollment.EnrolledAt ?? DateTime.Now):g} • new course",
                Icon = "school",
                ColorClass = "tertiary",
                HappenedAt = enrollment.EnrolledAt
            }));

            activity.AddRange(recentNews.Select(news => new HomeActivityItemViewModel
            {
                Title = $"News: {news.Title}",
                Detail = $"{(news.CreatedAt ?? DateTime.Now):g} • academy update",
                Icon = "campaign",
                ColorClass = "outline",
                HappenedAt = news.CreatedAt
            }));

            activity = activity
                .OrderByDescending(item => item.HappenedAt ?? DateTime.MinValue)
                .Take(4)
                .ToList();

            var nextGoalLabel = dayStreak < 3 ? "Daily Streak" : totalCompletedLessons < 3 ? "Lesson Goal" : "XP Goal";
            var nextGoalCurrent = dayStreak < 3 ? dayStreak : totalCompletedLessons < 3 ? totalCompletedLessons : totalXp;
            var nextGoalTarget = dayStreak < 3 ? 3 : totalCompletedLessons < 3 ? 3 : Math.Max(1000, totalXp + 500);

            var viewModel = new HomeDashboardViewModel
            {
                UserName = currentUser?.FullName ?? currentUser?.Username ?? User.Identity?.Name ?? "Alchemist",
                Role = currentUser?.Role ?? User.FindFirstValue(ClaimTypes.Role) ?? "Student",
                AvatarUrl = currentUser?.AvatarUrl ?? User.FindFirstValue("AvatarUrl") ?? "https://via.placeholder.com/150",
                TotalStudents = totalStudents,
                TotalCourses = totalCourses,
                TotalLessons = totalLessons,
                TotalCategories = totalCategories,
                TotalQuizResults = totalQuizResults,
                TotalCompletedLessons = totalCompletedLessons,
                TotalEnrollments = totalEnrollments,
                DayStreak = dayStreak,
                TotalXp = totalXp,
                NextGoalLabel = nextGoalLabel,
                NextGoalCurrent = nextGoalCurrent,
                NextGoalTarget = nextGoalTarget,
                ContinueCourse = continueCourse,
                Stats = new List<HomeStatCardViewModel>
                {
                    new() { Title = "Lessons Done", Value = totalCompletedLessons.ToString(), Description = "from your own progress", Icon = "menu_book", ColorClass = "primary" },
                    new() { Title = "Quizzes", Value = totalQuizResults.ToString(), Description = "quiz attempts in DB", Icon = "fact_check", ColorClass = "secondary" },
                    new() { Title = "Day Streak", Value = dayStreak.ToString(), Description = "consecutive active days", Icon = "local_fire_department", ColorClass = "tertiary" },
                    new() { Title = "Total XP", Value = totalXp.ToString("N0"), Description = "calculated from real activity", Icon = "military_tech", ColorClass = "primary" }
                },
                Missions = missions,
                RecentLessons = recentLessons.Select(lesson => new HomeLessonCardViewModel
                {
                    Id = lesson.Id,
                    Title = lesson.Title ?? "Untitled lesson",
                    CourseTitle = lesson.Chapter?.Course?.Title ?? "No course",
                    ChapterTitle = lesson.Chapter?.Title ?? "No chapter",
                    IsPreview = lesson.IsPreview == true,
                    CreatedAt = lesson.CreatedAt
                }).ToList(),
                Achievements = achievements,
                RecentActivity = activity,
                RecentCourses = recentCourses.Select(course =>
                {
                    // Calculate actual progress for each course
                    var totalLessons = course.Chapters.SelectMany(ch => ch.Lessons).Count();
                    var completedLessons = 0;

                    if (userId > 0 && totalLessons > 0)
                    {
                        var lessonIds = course.Chapters.SelectMany(ch => ch.Lessons).Select(l => l.Id).ToList();
                        completedLessons = _context.UserLessonProgresses
                            .AsNoTracking()
                            .Count(p => p.UserId == userId && p.IsCompleted == true && lessonIds.Contains(p.LessonId));
                    }

                    var progressPercent = totalLessons > 0
                        ? (int)Math.Round((double)completedLessons / totalLessons * 100)
                        : 0;

                    return new HomeCourseCardViewModel
                    {
                        Id = course.Id,
                        Title = course.Title ?? "Untitled course",
                        Description = course.Description,
                        ThumbnailUrl = course.ThumbnailUrl,
                        TeacherName = course.Teacher?.FullName ?? course.Teacher?.Username,
                        Status = course.Status,
                        CreatedAt = course.CreatedAt,
                        ProgressPercent = progressPercent
                    };
                }).ToList(),
                RecentNews = recentNews.Select(news => new HomeNewsCardViewModel
                {
                    Title = news.Title ?? "Untitled news",
                    Summary = news.Content,
                    ThumbnailUrl = news.ThumbnailUrl,
                    CreatedAt = news.CreatedAt
                }).ToList()
            };

            return View(viewModel);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
