namespace ChemistryV1.ViewModels;

public class CategoryManagementViewModel
{
    public string? Search { get; set; }

    public List<CategoryCardViewModel> Categories { get; set; } = new();
}
