namespace ChemistryV1.ViewModels;

public class AchievementDashboardViewModel
{
    public string UserName { get; set; } = string.Empty;

    public string Role { get; set; } = string.Empty;

    public string AvatarUrl { get; set; } = string.Empty;

    public int MissionCompletionRate { get; set; }

    public int CompletedMissions { get; set; }

    public int TotalMissions { get; set; }

    public int TotalCompletedLessons { get; set; }

    public int TotalQuizResults { get; set; }

    public int DayStreak { get; set; }

    public int TotalXp { get; set; }

    public int EstimatedStudyMinutes { get; set; }

    public int AverageStudyMinutesPerDay { get; set; }

    public int ActiveDaysLast7 { get; set; }

    public List<AchievementInsightItemViewModel> Strengths { get; set; } = new();

    public List<AchievementInsightItemViewModel> Weaknesses { get; set; } = new();

    public List<AchievementSkillItemViewModel> Skills { get; set; } = new();

    public List<AchievementPatternPointViewModel> LearningPattern { get; set; } = new();

    public string AiAnalysis { get; set; } = string.Empty;

    public string NextRecommendation { get; set; } = string.Empty;
}

public class AchievementInsightItemViewModel
{
    public string Title { get; set; } = string.Empty;

    public string Detail { get; set; } = string.Empty;

    public int ScorePercent { get; set; }

    public string Tone { get; set; } = "primary";
}

public class AchievementSkillItemViewModel
{
    public string Name { get; set; } = string.Empty;

    public string Icon { get; set; } = string.Empty;

    public int ProgressPercent { get; set; }

    public string LevelText { get; set; } = string.Empty;

    public string Tone { get; set; } = "primary";
}

public class AchievementPatternPointViewModel
{
    public string DayLabel { get; set; } = string.Empty;

    public int ActivityCount { get; set; }
}
