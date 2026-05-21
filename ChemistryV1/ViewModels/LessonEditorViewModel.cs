using ChemistryV1.Models;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace ChemistryV1.ViewModels;

public class LessonEditorViewModel
{
    [ValidateNever]
    public Course Course { get; set; } = null!;

    [ValidateNever]
    public IEnumerable<Chapter> Chapters { get; set; } = new List<Chapter>();

    public Lesson Lesson { get; set; } = new Lesson();

    [ValidateNever]
    public List<VirtualLab> AvailableVirtualLabs { get; set; } = new List<VirtualLab>();
}
