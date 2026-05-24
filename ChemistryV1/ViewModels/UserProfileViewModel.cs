namespace ChemistryV1.ViewModels;

public class UserProfileViewModel
{
    public string UserName { get; set; } = string.Empty;

    public string Role { get; set; } = string.Empty;

    public string AvatarUrl { get; set; } = string.Empty;

    public int Level { get; set; }

    public int TotalXp { get; set; }

    public int CurrentLevelXp { get; set; }

    public int NextLevelXp { get; set; }

    public int XpToNextLevel { get; set; }

    public int LevelProgressPercent { get; set; }

    public int TotalScore { get; set; }

    public int CompletedMissions { get; set; }

    public int TotalCompletedLessons { get; set; }

    public int TotalQuizResults { get; set; }

    public int DayStreak { get; set; }

    public List<UserProfileBadgeViewModel> Badges { get; set; } = new();

    public List<UserProfileSkillViewModel> Skills { get; set; } = new();

    public List<UserProfileElementViewModel> Elements { get; set; } = new();

    public List<UserProfileActivityViewModel> RecentActivity { get; set; } = new();

    public List<UserProfileMissionViewModel> Missions { get; set; } = new();

    public List<UserProfileRoadmapStepViewModel> RoadmapSteps { get; set; } = new();
}

public class UserProfileBadgeViewModel
{
    public string Title { get; set; } = string.Empty;

    public string Icon { get; set; } = string.Empty;

    public string Tone { get; set; } = "primary";

    public bool Earned { get; set; }
}

public class UserProfileSkillViewModel
{
    public string Name { get; set; } = string.Empty;

    public string Icon { get; set; } = string.Empty;

    public string ValueLabel { get; set; } = string.Empty;

    public int ProgressPercent { get; set; }

    public string Tone { get; set; } = "primary";
}

public class UserProfileElementViewModel
{
    public string Symbol { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string Tone { get; set; } = "primary";

    public bool Unlocked { get; set; }
}

public class UserProfileActivityViewModel
{
    public string Title { get; set; } = string.Empty;

    public string TimeLabel { get; set; } = string.Empty;

    public string Icon { get; set; } = string.Empty;

    public string Tone { get; set; } = "primary";
}

public class UserProfileRoadmapStepViewModel
{
    public string Title { get; set; } = string.Empty;

    public string Subtitle { get; set; } = string.Empty;

    public string Icon { get; set; } = string.Empty;

    public string State { get; set; } = "locked";
}

public class UserProfileMissionViewModel
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string RewardText { get; set; } = string.Empty;

    public string Icon { get; set; } = string.Empty;

    public string Tone { get; set; } = "primary";

    public int Current { get; set; }

    public int Target { get; set; }

    public int ProgressPercent { get; set; }

    public bool Completed { get; set; }
}
