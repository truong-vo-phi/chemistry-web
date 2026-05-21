namespace ChemistryV1.Models.Auth;

public record RegisterRequest(string FullName, string Email, string Phone, string Password);
public record LoginRequest(string Email, string Password);
public record RefreshTokenRequest(string RefreshToken);
public record LogoutRequest(string RefreshToken);
public record ChangePasswordRequest(string CurrentPassword, string NewPassword);
public record UpdateProfileRequest(string FullName, string Phone, string AvatarUrl);

public record UserProfileResponse(
    Guid Id,
    string FullName,
    string Email,
    string Phone,
    string AvatarUrl,
    string Role,
    bool Approved);

public record AuthTokensResponse(string AccessToken, string RefreshToken, string AccessTokenExpiresAt);

public record AuthSessionResponse(UserProfileResponse User, AuthTokensResponse Tokens);
