using System;
using System.Collections.Generic;

namespace ChemistryV1.Models;

public partial class QuizResult
{
    public int Id { get; set; }

    public int? RevisionId { get; set; }

    public int? StudentId { get; set; }

    public double? Score { get; set; }

    public int? TotalCorrect { get; set; }

    public DateTime? CompletedAt { get; set; }

    public virtual Revision? Revision { get; set; }

    public virtual User? Student { get; set; }
}
