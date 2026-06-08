using System;
using System.Collections.Generic;

namespace ChemistryV1.Models;

public partial class Comment
{
    public int Id { get; set; }

    public int? LessonId { get; set; }

    public int? UserId { get; set; }

    public int? ParentId { get; set; }

    public int? MissionId { get; set; }

    public string? Content { get; set; }

    public DateTime? CreatedAt { get; set; }

    // Report/Flag fields
    public bool IsReported { get; set; } = false;

    public int ReportCount { get; set; } = 0;

    public string? ReportReason { get; set; }

    public DateTime? ReportedAt { get; set; }

    // Admin action
    public string? AdminAction { get; set; } // "warning", "delete", "hidden", null

    public string? AdminActionReason { get; set; }

    public int? AdminActionBy { get; set; }

    public DateTime? ActionTakenAt { get; set; }

    public virtual ICollection<Comment> InverseParent { get; set; } = new List<Comment>();

    public virtual Lesson? Lesson { get; set; }

    public virtual SystemMission? Mission { get; set; }

    public virtual Comment? Parent { get; set; }

    public virtual User? User { get; set; }
}
