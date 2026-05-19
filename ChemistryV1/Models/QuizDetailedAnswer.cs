using System;
using System.Collections.Generic;

namespace ChemistryV1.Models;

public partial class QuizDetailedAnswer
{
    public int? QuizResultId { get; set; }

    public int? QuestionId { get; set; }

    public string? SelectedAnswer { get; set; }

    public bool? IsCorrect { get; set; }

    public virtual Question? Question { get; set; }

    public virtual QuizResult? QuizResult { get; set; }
}
