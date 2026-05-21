namespace ChemistryV1.Services.Auth;

public interface IPasswordHasherService
{
    string HashPassword(string password);
    bool VerifyPassword(string password, string storedHash);
}
