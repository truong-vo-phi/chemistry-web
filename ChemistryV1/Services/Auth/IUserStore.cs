using ChemistryV1.Models.Auth;

namespace ChemistryV1.Services.Auth;

public interface IUserStore
{
    UserAccount? FindByEmail(string email);
    UserAccount? FindById(Guid id);
    UserAccount? FindByRefreshToken(string refreshToken);
    UserAccount Create(UserAccount user);
    void Save(UserAccount user);
}
