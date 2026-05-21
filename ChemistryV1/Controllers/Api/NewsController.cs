using ChemistryV1.Services.Content;
using Microsoft.AspNetCore.Mvc;

namespace ChemistryV1.Controllers.Api;

[ApiController]
[Route("api/news")]
public class NewsController : ControllerBase
{
    private readonly IContentService _contentService;

    public NewsController(IContentService contentService)
    {
        _contentService = contentService;
    }

    [HttpGet("latest")]
    public IActionResult Latest()
    {
        return Ok(_contentService.GetLatestNews());
    }
}
