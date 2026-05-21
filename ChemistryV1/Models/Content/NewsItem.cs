namespace ChemistryV1.Models.Content;

public class NewsItem
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public DateOnly PublishedDate { get; set; }
    public string Url { get; set; } = string.Empty;
}
