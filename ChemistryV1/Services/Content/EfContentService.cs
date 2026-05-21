using ChemistryV1.Data;
using ChemistryV1.Models.Content;

namespace ChemistryV1.Services.Content;

public class EfContentService : IContentService
{
    private readonly AppDbContext _dbContext;

    public EfContentService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public IReadOnlyList<NewsItemDto> GetLatestNews() =>
        _dbContext.NewsItems
            .OrderByDescending(x => x.PublishedDate)
            .Take(10)
            .Select(x => new NewsItemDto(x.Slug, x.Title, x.Summary, x.PublishedDate.ToString("yyyy-MM-dd"), x.Url))
            .ToList();

    public IReadOnlyList<FeaturedCourseDto> GetFeaturedCourses() =>
        _dbContext.FeaturedCourses
            .OrderBy(x => x.DisplayOrder)
            .Take(10)
            .Select(x => new FeaturedCourseDto(x.Slug, x.Title, x.Level, x.Lessons, x.Url))
            .ToList();
}
