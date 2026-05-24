using System;
using System.Collections.Generic;

namespace ChemistryV1.Models;

public partial class LessonSubmission
{
    public int Id { get; set; }

    public int? LessonId { get; set; }

    public int? StudentId { get; set; }

    public string? SubmissionContent { get; set; }

    public string? FileUrl { get; set; }

    public double? Score { get; set; }

    public string? TeacherComment { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Lesson? Lesson { get; set; }

    public virtual User? Student { get; set; }
}
