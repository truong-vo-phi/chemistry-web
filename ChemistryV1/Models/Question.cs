using System;
using System.Collections.Generic;

namespace ChemistryV1.Models;

public partial class Question
{
    public int Id { get; set; }

    public int? CourseId { get; set; }

    public string? Content { get; set; }

    public string? Options { get; set; }

    public string? CorrectAnswer { get; set; }

    public virtual Course? Course { get; set; }

    public virtual ICollection<Revision> Revisions { get; set; } = new List<Revision>();
}
