using System.Collections.Generic;
using ChemistryV1.Models;

namespace ChemistryV1.ViewModels;

public class MissionDetailsViewModel
{
    public int MissionId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string RewardText { get; set; } = string.Empty;

    public string Icon { get; set; } = string.Empty;

    public string Tone { get; set; } = "primary";

    public int Current { get; set; }

    public int Target { get; set; }

    public int ProgressPercent { get; set; }

    public bool Completed { get; set; }

    public List<Comment> Comments { get; set; } = new();
}
