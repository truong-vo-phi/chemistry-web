using System;
using System.Collections.Generic;

namespace ChemistryV1.Models;

public partial class Revision
{
    public int Id { get; set; }

    public int? CourseId { get; set; }

    public string? Title { get; set; }

    public int? TimeLimit { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Course? Course { get; set; }

    public virtual ICollection<QuizResult> QuizResults { get; set; } = new List<QuizResult>();

    public virtual ICollection<Question> Questions { get; set; } = new List<Question>();
}
