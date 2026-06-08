using System;
using System.Collections.Generic;

namespace ChemistryV1.Models;

public partial class UserLessonProgress
{
    public int UserId { get; set; }

    public int LessonId { get; set; }

    public bool? IsCompleted { get; set; }

    public DateTime? CompletedAt { get; set; }

    public virtual Lesson Lesson { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
