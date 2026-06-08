namespace ChemistryV1.ViewModels;

public class HomeDashboardViewModel
{
    public string UserName { get; set; } = string.Empty;

    public string Role { get; set; } = string.Empty;

    public string AvatarUrl { get; set; } = string.Empty;

    public int TotalStudents { get; set; }

    public int TotalCourses { get; set; }

    public int TotalLessons { get; set; }

    public int TotalCategories { get; set; }

    public int TotalQuizResults { get; set; }

    public int TotalCompletedLessons { get; set; }

    public int TotalEnrollments { get; set; }

    public int DayStreak { get; set; }

    public int TotalXp { get; set; }

    public string NextGoalLabel { get; set; } = string.Empty;

    public int NextGoalCurrent { get; set; }

    public int NextGoalTarget { get; set; }

    public HomeCourseCardViewModel? ContinueCourse { get; set; }

    public List<HomeStatCardViewModel> Stats { get; set; } = new();

    public List<HomeMissionCardViewModel> Missions { get; set; } = new();

    public List<HomeLessonCardViewModel> RecentLessons { get; set; } = new();

    public List<HomeAchievementCardViewModel> Achievements { get; set; } = new();

    public List<HomeActivityItemViewModel> RecentActivity { get; set; } = new();

    public List<HomeCourseCardViewModel> RecentCourses { get; set; } = new();

    public List<HomeNewsCardViewModel> RecentNews { get; set; } = new();
}

public class HomeStatCardViewModel
{
    public string Title { get; set; } = string.Empty;

    public string Value { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string Icon { get; set; } = string.Empty;

    public string ColorClass { get; set; } = string.Empty;
}

public class HomeMissionCardViewModel
{
    public string Title { get; set; } = string.Empty;

    public string RewardText { get; set; } = string.Empty;

    public int Current { get; set; }

    public int Target { get; set; }

    public string Icon { get; set; } = string.Empty;

    public string ColorClass { get; set; } = string.Empty;

    public bool Completed => Current >= Target;

    public int ProgressPercent => Target <= 0 ? 0 : Math.Min(100, (int)Math.Round(Current * 100.0 / Target));
}

public class HomeCourseCardViewModel
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string? ThumbnailUrl { get; set; }

    public string? TeacherName { get; set; }

    public string? Status { get; set; }

    public DateTime? CreatedAt { get; set; }

    public int ProgressPercent { get; set; }

    public string ProgressLabel => ProgressPercent > 0 ? $"{ProgressPercent}%" : "New";
}

public class HomeLessonCardViewModel
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string CourseTitle { get; set; } = string.Empty;

    public string ChapterTitle { get; set; } = string.Empty;

    public bool IsPreview { get; set; }

    public DateTime? CreatedAt { get; set; }
}

public class HomeAchievementCardViewModel
{
    public string Title { get; set; } = string.Empty;

    public string Tier { get; set; } = string.Empty;

    public string Icon { get; set; } = string.Empty;

    public string ColorClass { get; set; } = string.Empty;

    public bool Earned { get; set; }
}

public class HomeActivityItemViewModel
{
    public string Title { get; set; } = string.Empty;

    public string Detail { get; set; } = string.Empty;

    public string Icon { get; set; } = string.Empty;

    public string ColorClass { get; set; } = string.Empty;

    public DateTime? HappenedAt { get; set; }
}

public class HomeNewsCardViewModel
{
    public string Title { get; set; } = string.Empty;

    public string? Summary { get; set; }

    public string? ThumbnailUrl { get; set; }

    public DateTime? CreatedAt { get; set; }
}