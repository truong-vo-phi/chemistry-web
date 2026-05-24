using System.Collections.Generic;

namespace ChemistryV1.ViewModels;

public class LeaderboardViewModel
{
    public string SortBy { get; set; } = "xp";
    public List<LeaderboardUserViewModel> Users { get; set; } = new();
}

public class LeaderboardUserViewModel
{
    public int Rank { get; set; }
    public int UserId { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string AvatarUrl { get; set; } = string.Empty;
    public int Xp { get; set; }
    public int Level { get; set; }
    public int Streak { get; set; }
    public int CompletedMissions { get; set; }
    public int Score { get; set; }
}
