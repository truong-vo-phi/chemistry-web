using ChemistryV1.Data;
using ChemistryV1.Models.Auth;
using Microsoft.EntityFrameworkCore;

namespace ChemistryV1.Services.Auth;

public class EfUserStore : IUserStore
{
    private readonly AppDbContext _dbContext;

    public EfUserStore(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public UserAccount? FindByEmail(string email) =>
        _dbContext.Users.Include(x => x.RefreshTokens).FirstOrDefault(x => x.Email == email);

    public UserAccount? FindById(Guid id) =>
        _dbContext.Users.Include(x => x.RefreshTokens).FirstOrDefault(x => x.Id == id);

    public UserAccount? FindByRefreshToken(string refreshToken) =>
        _dbContext.Users.Include(x => x.RefreshTokens).FirstOrDefault(x => x.RefreshTokens.Any(t => t.Token == refreshToken));

    public UserAccount Create(UserAccount user)
    {
        _dbContext.Users.Add(user);
        _dbContext.SaveChanges();
        return user;
    }

    public void Save(UserAccount user)
    {
        _dbContext.Users.Update(user);
        _dbContext.SaveChanges();
    }
}
