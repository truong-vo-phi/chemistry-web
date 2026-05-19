using ChemistryV1.Models;

namespace ChemistryV1.ViewModels;

public class CategoryCreateEditViewModel
{
    public Category Category { get; set; } = new();
    
    public List<string> AvailableIcons { get; set; } = new()
    {
        "experiment",
        "molecule",
        "microscope",
        "rocket_launch",
        "eco",
        "electric_bolt",
        "water_drop",
        "all_inclusive",
        "flask",
        "science",
        "school",
        "menu_book",
        "star"
    };

    public string PageTitle => Category.Id == 0 ? "Create New Category" : $"Edit {Category.Name}";
    
    public string SubmitButtonText => Category.Id == 0 ? "CREATE CATEGORY" : "UPDATE CATEGORY";
    
    public string DraftButtonText => "SAVE AS DRAFT";
    
    public bool IsEditMode => Category.Id != 0;
    
    public int CourseCount { get; set; }
    
    public DateTime? CreatedDate { get; set; }
}
