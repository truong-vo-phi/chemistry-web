namespace ChemistryV1.Models.Content;

public class FeaturedCourse
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Level { get; set; } = string.Empty;
    public int Lessons { get; set; }
    public string Url { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
}
