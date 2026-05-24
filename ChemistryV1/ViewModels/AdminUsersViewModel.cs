using ChemistryV1.Models;

namespace ChemistryV1.ViewModels;

public class AdminUsersViewModel
{
    public string? Search { get; set; }

    public List<User> Users { get; set; } = new();
}