namespace ChemistryV1.Models.Auth;

public class JwtOptions
{
    public const string SectionName = "Jwt";

    public string Issuer { get; set; } = "ChemistryV1";
    public string Audience { get; set; } = "ChemistryWebFrontend";
    public string SecretKey { get; set; } = "CHANGE_ME_TO_A_LONG_RANDOM_SECRET_KEY_123456789";
    public int AccessTokenMinutes { get; set; } = 15;
    public int RefreshTokenDays { get; set; } = 14;
}
