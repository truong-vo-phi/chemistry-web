using System;
using System.Collections.Generic;

namespace ChemistryV1.Models;

public partial class Chapter
{
    public int Id { get; set; }

    public int? CourseId { get; set; }

    public string? Title { get; set; }

    public int? OrderIndex { get; set; }

    public virtual Course? Course { get; set; }

    public virtual ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();
}
