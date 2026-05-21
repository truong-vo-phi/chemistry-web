using ChemistryV1.Services.Content;
using Microsoft.AspNetCore.Mvc;

namespace ChemistryV1.Controllers.Api;

[ApiController]
[Route("api/courses")]
public class CoursesController : ControllerBase
{
    private readonly IContentService _contentService;

    public CoursesController(IContentService contentService)
    {
        _contentService = contentService;
    }

    [HttpGet("featured")]
    public IActionResult Featured()
    {
        return Ok(_contentService.GetFeaturedCourses());
    }
}
