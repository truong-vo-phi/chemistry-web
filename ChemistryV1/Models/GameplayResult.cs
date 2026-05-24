using System;

namespace ChemistryV1.Models;

public partial class GameplayResult
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int Score { get; set; }

    public int Xp { get; set; }

    public int CompletionTime { get; set; }

    public string? MissionStatus { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual User User { get; set; } = null!;
}
