using ChemistryV1.Models;
using ChemistryV1.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChemistryV1.Controllers;

[Authorize(Roles = "Admin")]
public class AdminUsersController : Controller
{
    private readonly ElearningDbContext _context;

    public AdminUsersController(ElearningDbContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index(string? search)
    {
        var query = _context.Users.AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(user =>
                (user.Username != null && EF.Functions.Like(user.Username, $"%{search}%")) ||
                (user.FullName != null && EF.Functions.Like(user.FullName, $"%{search}%")) ||
                (user.Email != null && EF.Functions.Like(user.Email, $"%{search}%")));
        }

        var viewModel = new AdminUsersViewModel
        {
            Search = search,
            Users = await query
                .OrderByDescending(user => user.CreatedAt)
                .ThenBy(user => user.FullName)
                .ToListAsync()
        };

        return View(viewModel);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> ToggleActive(int id)
    {
        var currentUserId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrWhiteSpace(currentUserId) || !int.TryParse(currentUserId, out var adminId))
        {
            return Challenge();
        }

        if (id == adminId)
        {
            TempData["UserActionMessage"] = "Bạn không thể tự khóa tài khoản của chính mình.";
            return RedirectToAction(nameof(Index));
        }

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        if (user == null)
        {
            return NotFound();
        }

        user.IsActive = user.IsActive != true;
        await _context.SaveChangesAsync();

        TempData["UserActionMessage"] = user.IsActive == true
            ? $"Đã mở khóa tài khoản {user.Username}."
            : $"Đã khóa tài khoản {user.Username}.";

        return RedirectToAction(nameof(Index));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> UpdateRole(int id, string role)
    {
        if (role != "Student" && role != "Admin")
        {
            return BadRequest();
        }

        var currentUserId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrWhiteSpace(currentUserId) || !int.TryParse(currentUserId, out var adminId))
        {
            return Challenge();
        }

        if (id == adminId && role != "Admin")
        {
            TempData["UserActionMessage"] = "Bạn không thể tự hạ quyền của chính mình.";
            return RedirectToAction(nameof(Index));
        }

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        if (user == null)
        {
            return NotFound();
        }

        user.Role = role;
        await _context.SaveChangesAsync();

        TempData["UserActionMessage"] = $"Đã cập nhật quyền của {user.Username} thành {role}.";
        return RedirectToAction(nameof(Index));
    }
}