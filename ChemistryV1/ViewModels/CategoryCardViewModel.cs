using ChemistryV1.Models;

namespace ChemistryV1.ViewModels;

public class CategoryCardViewModel
{
    public Category Category { get; set; } = null!;

    public int CourseCount { get; set; }

    public bool IsActive { get; set; }
}
