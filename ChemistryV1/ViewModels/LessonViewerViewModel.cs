using ChemistryV1.Models;

namespace ChemistryV1.ViewModels;

public class LessonViewerViewModel
{
    public Course Course { get; set; } = null!;

    public IEnumerable<Chapter> Chapters { get; set; } = new List<Chapter>();

    public Lesson Lesson { get; set; } = null!;

    public List<int> CompletedLessonIds { get; set; } = new List<int>();

    public double? HighestScore { get; set; }
}
