using ChemistryV1.Models;

namespace ChemistryV1.ViewModels;

public class TeacherCoursesIndexViewModel
{
    public IEnumerable<Course> Courses { get; set; } = new List<Course>();

    public IEnumerable<User> Teachers { get; set; } = new List<User>();

    public int? TeacherId { get; set; }

    public string? Search { get; set; }
}
