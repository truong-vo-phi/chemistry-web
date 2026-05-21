namespace ChemistryV1.Models.Auth;

public class RefreshTokenRecord
{
    public int Id { get; set; }
    public Guid UserAccountId { get; set; }
    public UserAccount? UserAccount { get; set; }
    public string Token { get; set; } = string.Empty;
    public DateTime ExpiresAtUtc { get; set; }
    public DateTime? RevokedAtUtc { get; set; }

    public bool IsActive => RevokedAtUtc is null && ExpiresAtUtc > DateTime.UtcNow;
}
