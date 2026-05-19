using ChemistryV1.Models;

namespace ChemistryV1.ViewModels;

public class CourseContentViewModel
{
    public Course Course { get; set; } = null!;

    public IEnumerable<Chapter> Chapters { get; set; } = new List<Chapter>();
}
