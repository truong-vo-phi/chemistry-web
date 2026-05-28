using ChemistryV1.Models;
using Microsoft.AspNetCore.Http;

namespace ChemistryV1.ViewModels;

public class TeacherCourseEditViewModel
{
    public int? Id { get; set; }

    public string? Title { get; set; }

    public string? Slug { get; set; }

    public string? Description { get; set; }

    public string? ThumbnailUrl { get; set; }

    public IFormFile? ThumbnailFile { get; set; }

    public int? TeacherId { get; set; }

    public string? Status { get; set; }

    public List<int> SelectedCategoryIds { get; set; } = new();

    public IEnumerable<Category> Categories { get; set; } = new List<Category>();

    public IEnumerable<User> Teachers { get; set; } = new List<User>();
}
