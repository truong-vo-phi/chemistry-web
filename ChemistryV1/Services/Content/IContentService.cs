using ChemistryV1.Models.Content;

namespace ChemistryV1.Services.Content;

public interface IContentService
{
    IReadOnlyList<NewsItemDto> GetLatestNews();
    IReadOnlyList<FeaturedCourseDto> GetFeaturedCourses();
}
