using ChemistryV1.Models.Auth;

namespace ChemistryV1.Services.Auth;

public interface ITokenService
{
    (string AccessToken, DateTime AccessTokenExpiresAtUtc) GenerateAccessToken(UserAccount user);
    string GenerateRefreshToken();
}
