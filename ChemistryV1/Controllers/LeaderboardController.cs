using System;
using System.Linq;
using System.Threading.Tasks;
using ChemistryV1.Models;
using ChemistryV1.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChemistryV1.Controllers;

[Authorize]
public class LeaderboardController : Controller
{
    private readonly ElearningDbContext _context;

    public LeaderboardController(ElearningDbContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index(string sortBy = "xp")
    {
        sortBy = sortBy?.ToLowerInvariant() ?? "xp";

        // Query students
        var query = _context.Users
            .Where(u => u.Role == "Student" && u.IsActive == true);

        // Dynamic sorting
        query = sortBy switch
        {
            "level" => query.OrderByDescending(u => u.Level).ThenByDescending(u => u.Xp),
            "streak" => query.OrderByDescending(u => u.Streak).ThenByDescending(u => u.Xp),
            "missions" => query.OrderByDescending(u => u.CompletedMissions).ThenByDescending(u => u.Xp),
            "score" => query.OrderByDescending(u => u.Score).ThenByDescending(u => u.Xp),
            _ => query.OrderByDescending(u => u.Xp).ThenByDescending(u => u.Level)
        };

        var usersList = await query.ToListAsync();

        var rankedUsers = usersList.Select((u, index) => new LeaderboardUserViewModel
        {
            Rank = index + 1,
            UserId = u.Id,
            FullName = u.FullName ?? u.Username ?? "Alchemist",
            Username = u.Username,
            AvatarUrl = u.AvatarUrl ?? "https://api.dicebear.com/7.x/adventurer/svg?seed=" + u.Username,
            Xp = u.Xp,
            Level = u.Level,
            Streak = u.Streak,
            CompletedMissions = u.CompletedMissions,
            Score = u.Score
        }).ToList();

        var viewModel = new LeaderboardViewModel
        {
            SortBy = sortBy,
            Users = rankedUsers
        };

        return View(viewModel);
    }
}
