using ChemistryV1.Models.Auth;
using ChemistryV1.Services.Auth;
using Microsoft.AspNetCore.Mvc;

namespace ChemistryV1.Controllers.Api;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterRequest request)
    {
        var result = _authService.Register(request);
        if (!result.Success) return BadRequest(new { message = result.Message });
        return Ok(new { message = result.Message });
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        var session = _authService.Login(request);
        if (session is null) return Unauthorized(new { message = "Email hoac mat khau khong dung" });
        return Ok(session);
    }

    [HttpPost("refresh-token")]
    public IActionResult RefreshToken([FromBody] RefreshTokenRequest request)
    {
        var session = _authService.RefreshToken(request.RefreshToken);
        if (session is null) return Unauthorized(new { message = "Refresh token khong hop le hoac da het han" });
        return Ok(session);
    }

    [HttpPost("logout")]
    public IActionResult Logout([FromBody] LogoutRequest request)
    {
        var ok = _authService.Logout(request.RefreshToken);
        if (!ok) return BadRequest(new { message = "Khong the dang xuat voi refresh token nay" });
        return Ok(new { message = "Dang xuat thanh cong" });
    }
}
