namespace ChemistryV1.ViewModels;

public class CourseAiAskRequest
{
    public string? Question { get; set; }
}

public class CourseAiAskResponse
{
    public bool Success { get; set; }

    public string Answer { get; set; } = string.Empty;

    public IReadOnlyList<string> Sources { get; set; } = Array.Empty<string>();

    public string? Error { get; set; }
}
