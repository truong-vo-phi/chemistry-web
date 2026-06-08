using ChemistryV1.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ChemistryV1.Controllers;

[Authorize(Roles = "Admin")]
public class AdminCommentsController : Controller
{
    private readonly ElearningDbContext _context;

    public AdminCommentsController(ElearningDbContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index(string? filterBy = "all", string? search = null)
    {
        var query = _context.Comments
            .Include(c => c.User)
            .Include(c => c.Lesson)
            .Include(c => c.Mission)
            .AsQueryable();

        // Filter by status
        query = filterBy switch
        {
            "reported" => query.Where(c => c.IsReported == true && c.AdminAction == null),
            "actioned" => query.Where(c => c.AdminAction != null),
            "warnings" => query.Where(c => c.AdminAction == "warning"),
            "deleted" => query.Where(c => c.AdminAction == "delete"),
            "hidden" => query.Where(c => c.AdminAction == "hidden"),
            _ => query
        };

        // Search by username or content
        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(c =>
                c.User!.Username!.Contains(search) ||
                c.User!.FullName!.Contains(search) ||
                c.Content!.Contains(search)
            );
        }

        var comments = await query
            .OrderByDescending(c => c.ReportCount)
            .ThenByDescending(c => c.IsReported)
            .ThenByDescending(c => c.CreatedAt)
            .ToListAsync();

        ViewData["FilterBy"] = filterBy;
        ViewData["Search"] = search;
        ViewData["TotalReported"] = await _context.Comments.CountAsync(c => c.IsReported && c.AdminAction == null);

        return View(comments);
    }

    [HttpGet]
    public async Task<IActionResult> Details(int id)
    {
        var comment = await _context.Comments
            .Include(c => c.User)
            .Include(c => c.Lesson)
            .Include(c => c.Mission)
            .Include(c => c.Parent)
            .ThenInclude(p => p!.User)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (comment == null)
            return NotFound();

        return PartialView("_CommentDetails", comment);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> TakeAction(int commentId, string action, string? reason = null)
    {
        var comment = await _context.Comments.FindAsync(commentId);
        if (comment == null)
            return NotFound();

        var adminIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(adminIdClaim))
            return Unauthorized();

        comment.AdminAction = action;
        comment.AdminActionReason = reason;
        comment.AdminActionBy = Convert.ToInt32(adminIdClaim);
        comment.ActionTakenAt = DateTime.UtcNow;

        if (action == "delete")
        {
            comment.Content = "[Bình luận đã bị xóa bởi quản trị viên]";
        }
        else if (action == "hidden")
        {
            comment.Content = "[Bình luận đã bị ẩn]";
        }

        _context.Comments.Update(comment);

        // If warning action, add warning to user
        if (action == "warning" && comment.UserId.HasValue)
        {
            var user = await _context.Users.FindAsync(comment.UserId.Value);
            if (user != null)
            {
                // Track warnings (you might want to add a separate table for this)
                // For now, we'll just log it in the action reason
            }
        }

        await _context.SaveChangesAsync();

        TempData["Success"] = $"Đã thực hiện hành động: {GetActionLabel(action)}";
        return RedirectToAction(nameof(Index));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> ClearReport(int commentId)
    {
        var comment = await _context.Comments.FindAsync(commentId);
        if (comment == null)
            return NotFound();

        comment.IsReported = false;
        comment.ReportCount = 0;
        comment.ReportReason = null;
        comment.ReportedAt = null;

        _context.Comments.Update(comment);
        await _context.SaveChangesAsync();

        TempData["Success"] = "Đã xóa báo cáo cho bình luận này";
        return RedirectToAction(nameof(Index));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Delete(int commentId)
    {
        var comment = await _context.Comments.FindAsync(commentId);
        if (comment == null)
            return NotFound();

        _context.Comments.Remove(comment);
        await _context.SaveChangesAsync();

        TempData["Success"] = "Đã xóa bình luận";
        return RedirectToAction(nameof(Index));
    }

    private static string GetActionLabel(string action) => action switch
    {
        "warning" => "Cảnh báo người dùng",
        "delete" => "Xóa bình luận",
        "hidden" => "Ẩn bình luận",
        _ => "Không rõ"
    };
}
