using System;
using System.Collections.Generic;

namespace ChemistryV1.Models;

public partial class Review
{
    public int Id { get; set; }

    public int? CourseId { get; set; }

    public int? UserId { get; set; }

    public string? Content { get; set; }

    public int? Rating { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Course? Course { get; set; }

    public virtual User? User { get; set; }
}
