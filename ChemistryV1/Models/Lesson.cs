using System;
using System.Collections.Generic;

namespace ChemistryV1.Models;

public partial class Lesson
{
    public int Id { get; set; }

    public int? ChapterId { get; set; }

    public string? Title { get; set; }

    public string? ContentType { get; set; }
    public string? VideoUrl { get; set; }

    public string? DocumentContent { get; set; }

    public string? PdfPath { get; set; }

    public string? AttachmentPath { get; set; }

    public int? OrderIndex { get; set; }

    public bool? IsPreview { get; set; }
    public bool? CommentsEnabled { get; set; } = true;

    public DateTime? CreatedAt { get; set; }

    public virtual Chapter? Chapter { get; set; }
    public int? VirtualLabId { get; set; }
    public virtual VirtualLab? VirtualLab { get; set; }

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual ICollection<LessonSubmission> LessonSubmissions { get; set; } = new List<LessonSubmission>();

    public virtual ICollection<UserLessonProgress> UserLessonProgresses { get; set; } = new List<UserLessonProgress>();
    
}
