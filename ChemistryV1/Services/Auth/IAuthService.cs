using ChemistryV1.Models.Auth;

namespace ChemistryV1.Services.Auth;

public interface IAuthService
{
    (bool Success, string Message) Register(RegisterRequest request);
    AuthSessionResponse? Login(LoginRequest request);
    AuthSessionResponse? RefreshToken(string refreshToken);
    bool Logout(string refreshToken);
    UserProfileResponse? GetProfile(Guid userId);
    UserProfileResponse? UpdateProfile(Guid userId, UpdateProfileRequest request);
    (bool Success, string Message) ChangePassword(Guid userId, ChangePasswordRequest request);
}
