using System;
using System.Collections.Generic;

namespace ChemistryV1.Models;

public partial class CourseEnrollment
{
    public int CourseId { get; set; }

    public int StudentId { get; set; }

    public DateTime? EnrolledAt { get; set; }

    public virtual Course Course { get; set; } = null!;

    public virtual User Student { get; set; } = null!;
}
