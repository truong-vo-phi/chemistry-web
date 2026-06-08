namespace ChemistryV1.ViewModels;

public class PracticeFlashcardsViewModel
{
    public List<PracticeCourseDeckViewModel> Courses { get; set; } = new();

    public int? SelectedCourseId { get; set; }

    public int? SelectedLessonId { get; set; }

    public string SelectedCourseTitle { get; set; } = string.Empty;

    public string SelectedLessonTitle { get; set; } = string.Empty;

    public string SelectedLessonSummary { get; set; } = string.Empty;

    public int TotalCards { get; set; }

    public List<PracticeFlashcardItemViewModel> Flashcards { get; set; } = new();
}

public class PracticeCourseDeckViewModel
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public List<PracticeLessonDeckViewModel> Lessons { get; set; } = new();
}

public class PracticeLessonDeckViewModel
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string ChapterTitle { get; set; } = string.Empty;

    public bool IsPreview { get; set; }
}

public class PracticeFlashcardItemViewModel
{
    public int Index { get; set; }

    public string Front { get; set; } = string.Empty;

    public string Back { get; set; } = string.Empty;

    public string Tag { get; set; } = string.Empty;
}
