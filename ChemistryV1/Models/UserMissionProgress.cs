using System;

namespace ChemistryV1.Models;

public partial class UserMissionProgress
{
    public int UserId { get; set; }

    public int MissionId { get; set; }

    public DateTime CompletedAt { get; set; }

    public virtual SystemMission? Mission { get; set; }

    public virtual User? User { get; set; }
}
