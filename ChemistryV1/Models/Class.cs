using System;
using System.Collections.Generic;

namespace ChemistryV1.Models;

public partial class Class
{
    public int Id { get; set; }

    public string? ClassName { get; set; }

    public int? SchoolId { get; set; }

    public int? TeacherId { get; set; }

    public string? AcademicYear { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual School? School { get; set; }

    public virtual User? Teacher { get; set; }

    public virtual ICollection<User> Students { get; set; } = new List<User>();
}
