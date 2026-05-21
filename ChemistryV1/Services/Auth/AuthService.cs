using ChemistryV1.Models.Auth;
using Microsoft.Extensions.Options;

namespace ChemistryV1.Services.Auth;

public class AuthService : IAuthService
{
    private readonly IUserStore _userStore;
    private readonly IPasswordHasherService _passwordHasherService;
    private readonly ITokenService _tokenService;
    private readonly JwtOptions _jwtOptions;

    public AuthService(
        IUserStore userStore,
        IPasswordHasherService passwordHasherService,
        ITokenService tokenService,
        IOptions<JwtOptions> jwtOptions)
    {
        _userStore = userStore;
        _passwordHasherService = passwordHasherService;
        _tokenService = tokenService;
        _jwtOptions = jwtOptions.Value;
    }

    public (bool Success, string Message) Register(RegisterRequest request)
    {
        if (_userStore.FindByEmail(request.Email) is not null)
        {
            return (false, "Email da ton tai");
        }

        var user = new UserAccount
        {
            Email = request.Email.Trim(),
            FullName = request.FullName.Trim(),
            Phone = request.Phone.Trim(),
            PasswordHash = _passwordHasherService.HashPassword(request.Password),
            Role = UserRole.Guest,
            IsApproved = false
        };

        _userStore.Create(user);
        return (true, "Dang ky thanh cong. Tai khoan o trang thai Guest cho duyet.");
    }

    public AuthSessionResponse? Login(LoginRequest request)
    {
        var user = _userStore.FindByEmail(request.Email);
        if (user is null) return null;
        if (!_passwordHasherService.VerifyPassword(request.Password, user.PasswordHash)) return null;

        var refreshToken = _tokenService.GenerateRefreshToken();
        user.RefreshTokens.Add(new RefreshTokenRecord
        {
            Token = refreshToken,
            ExpiresAtUtc = DateTime.UtcNow.AddDays(_jwtOptions.RefreshTokenDays)
        });
        _userStore.Save(user);

        return BuildSessionResponse(user, refreshToken);
    }

    public AuthSessionResponse? RefreshToken(string refreshToken)
    {
        var user = _userStore.FindByRefreshToken(refreshToken);
        if (user is null) return null;

        var tokenRecord = user.RefreshTokens.FirstOrDefault(x => x.Token == refreshToken);
        if (tokenRecord is null || !tokenRecord.IsActive) return null;

        tokenRecord.RevokedAtUtc = DateTime.UtcNow;
        var nextRefreshToken = _tokenService.GenerateRefreshToken();
        user.RefreshTokens.Add(new RefreshTokenRecord
        {
            Token = nextRefreshToken,
            ExpiresAtUtc = DateTime.UtcNow.AddDays(_jwtOptions.RefreshTokenDays)
        });
        _userStore.Save(user);

        return BuildSessionResponse(user, nextRefreshToken);
    }

    public bool Logout(string refreshToken)
    {
        var user = _userStore.FindByRefreshToken(refreshToken);
        if (user is null) return false;

        var tokenRecord = user.RefreshTokens.FirstOrDefault(x => x.Token == refreshToken);
        if (tokenRecord is null) return false;

        tokenRecord.RevokedAtUtc = DateTime.UtcNow;
        _userStore.Save(user);
        return true;
    }

    public UserProfileResponse? GetProfile(Guid userId)
    {
        var user = _userStore.FindById(userId);
        return user is null ? null : ToProfile(user);
    }

    public UserProfileResponse? UpdateProfile(Guid userId, UpdateProfileRequest request)
    {
        var user = _userStore.FindById(userId);
        if (user is null) return null;

        user.FullName = request.FullName.Trim();
        user.Phone = request.Phone.Trim();
        user.AvatarUrl = request.AvatarUrl.Trim();
        _userStore.Save(user);
        return ToProfile(user);
    }

    public (bool Success, string Message) ChangePassword(Guid userId, ChangePasswordRequest request)
    {
        var user = _userStore.FindById(userId);
        if (user is null) return (false, "Khong tim thay nguoi dung");

        if (!_passwordHasherService.VerifyPassword(request.CurrentPassword, user.PasswordHash))
        {
            return (false, "Mat khau cu khong dung");
        }

        user.PasswordHash = _passwordHasherService.HashPassword(request.NewPassword);
        _userStore.Save(user);
        return (true, "Doi mat khau thanh cong");
    }

    private AuthSessionResponse BuildSessionResponse(UserAccount user, string refreshToken)
    {
        var (accessToken, accessTokenExpiresAtUtc) = _tokenService.GenerateAccessToken(user);
        return new AuthSessionResponse(
            ToProfile(user),
            new AuthTokensResponse(accessToken, refreshToken, accessTokenExpiresAtUtc.ToString("O")));
    }

    private static UserProfileResponse ToProfile(UserAccount user) =>
        new(user.Id, user.FullName, user.Email, user.Phone, user.AvatarUrl, user.Role, user.IsApproved);
}
