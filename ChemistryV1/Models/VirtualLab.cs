using System;
using System.Collections.Generic;

namespace ChemistryV1.Models;

public partial class VirtualLab
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public string Url { get; set; } = null!;
    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();
}