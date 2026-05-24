using ChemistryV1.Models;

namespace ChemistryV1.ViewModels;

public class AdminMissionsViewModel
{
    public string? Search { get; set; }

    public int? EditId { get; set; }

    public List<SystemMission> Missions { get; set; } = new();

    public AdminMissionFormViewModel Form { get; set; } = new();
}

public class AdminMissionFormViewModel
{
    public int? Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string RewardText { get; set; } = string.Empty;

    public string MetricKey { get; set; } = "lessons_completed";

    public int TargetValue { get; set; } = 3;

    public string Icon { get; set; } = "check_circle";

    public string ColorClass { get; set; } = "primary";

    public bool IsActive { get; set; } = true;

    public int SortOrder { get; set; }
}