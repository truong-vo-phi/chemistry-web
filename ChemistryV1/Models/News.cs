using System;
using System.Collections.Generic;

namespace ChemistryV1.Models;

public partial class News
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public string? Slug { get; set; }

    public string? Content { get; set; }

    public string? ThumbnailUrl { get; set; }

    public int? AuthorId { get; set; }

    public string? Status { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual User? Author { get; set; }
}
