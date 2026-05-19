using ChemistryV1.Models;

namespace ChemistryV1.ViewModels;

public class CourseLibraryViewModel
{
    public string? Search { get; set; }

    public int? CategoryId { get; set; }

    public int? TeacherId { get; set; }

    public IEnumerable<Category> Categories { get; set; } = new List<Category>();

    public IEnumerable<User> Teachers { get; set; } = new List<User>();

    public IEnumerable<Course> Courses { get; set; } = new List<Course>();
}
