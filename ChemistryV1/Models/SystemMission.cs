using System;
using System.Collections.Generic;

namespace ChemistryV1.Models;

public partial class SystemMission
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string RewardText { get; set; } = string.Empty;

    public string MetricKey { get; set; } = string.Empty;

    public int TargetValue { get; set; }

    public string Icon { get; set; } = string.Empty;

    public string ColorClass { get; set; } = string.Empty;

    public bool IsActive { get; set; } = true;

    public int SortOrder { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual ICollection<UserMissionProgress> UserMissionProgresses { get; set; } = new List<UserMissionProgress>();
}