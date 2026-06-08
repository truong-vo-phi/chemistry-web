using System;
using System.Linq;
using System.Threading.Tasks;
using ChemistryV1.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ChemistryV1.Controllers;

[Authorize]
public class CommentsController : Controller
{
    private readonly ElearningDbContext _context;

    public CommentsController(ElearningDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(int? lessonId, int? missionId, int? parentId, string content)
    {
        if (string.IsNullOrWhiteSpace(content))
        {
            TempData["CommentError"] = "Nội dung bình luận không được để trống.";
            if (lessonId.HasValue)
                return RedirectToAction("Details", "Lessons", new { id = lessonId.Value });
            else if (missionId.HasValue)
                return RedirectToAction("Details", "Missions", new { id = missionId.Value });
            return RedirectToAction("Index", "Home");
        }

        if (lessonId.HasValue)
        {
            var lesson = await _context.Lessons.FindAsync(lessonId.Value);
            if (lesson == null)
            {
                return NotFound();
            }

            if (lesson.CommentsEnabled == false)
            {
                TempData["CommentError"] = "Diễn đàn thảo luận của bài học này đã bị khóa.";
                return RedirectToAction("Details", "Lessons", new { id = lessonId.Value });
            }
        }
        else if (missionId.HasValue)
        {
            var mission = await _context.SystemMissions.FindAsync(missionId.Value);
            if (mission == null)
            {
                return NotFound();
            }
        }
        else
        {
            return BadRequest();
        }

        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim))
        {
            return Challenge();
        }

        var comment = new Comment
        {
            LessonId = lessonId,
            MissionId = missionId,
            ParentId = parentId,
            UserId = Convert.ToInt32(userIdClaim),
            Content = content.Trim(),
            CreatedAt = DateTime.Now
        };

        _context.Comments.Add(comment);
        await _context.SaveChangesAsync();

        TempData["CommentSuccess"] = "Đã gửi bình luận thành công.";

        if (lessonId.HasValue)
        {
            return Redirect($"{Url.Action("Details", "Lessons", new { id = lessonId.Value })}#comment-{comment.Id}");
        }
        else
        {
            return Redirect($"{Url.Action("Details", "Missions", new { id = missionId!.Value })}#comment-{comment.Id}");
        }
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, string content)
    {
        var comment = await _context.Comments.FindAsync(id);
        if (comment == null)
        {
            return NotFound();
        }

        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim))
        {
            return Challenge();
        }

        var userId = Convert.ToInt32(userIdClaim);

        // Only creator can edit their own comment
        if (comment.UserId != userId)
        {
            return Forbid();
        }

        if (string.IsNullOrWhiteSpace(content))
        {
            TempData["CommentError"] = "Nội dung bình luận không được để trống.";
            if (comment.LessonId.HasValue)
                return Redirect($"{Url.Action("Details", "Lessons", new { id = comment.LessonId.Value })}#comment-{comment.Id}");
            else
                return Redirect($"{Url.Action("Details", "Missions", new { id = comment.MissionId!.Value })}#comment-{comment.Id}");
        }

        comment.Content = content.Trim();
        _context.Comments.Update(comment);
        await _context.SaveChangesAsync();

        TempData["CommentSuccess"] = "Cập nhật bình luận thành công.";
        
        if (comment.LessonId.HasValue)
            return Redirect($"{Url.Action("Details", "Lessons", new { id = comment.LessonId.Value })}#comment-{comment.Id}");
        else
            return Redirect($"{Url.Action("Details", "Missions", new { id = comment.MissionId!.Value })}#comment-{comment.Id}");
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Delete(int id)
    {
        var comment = await _context.Comments.FindAsync(id);
        if (comment == null)
        {
            return NotFound();
        }

        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim))
        {
            return Challenge();
        }

        var userId = Convert.ToInt32(userIdClaim);

        // Creator, Admin or Teacher can delete
        bool canDelete = comment.UserId == userId || User.IsInRole("Admin") || User.IsInRole("Teacher");
        if (!canDelete)
        {
            return Forbid();
        }

        int? lessonId = comment.LessonId;
        int? missionId = comment.MissionId;

        // Perform recursive deletion to bypass foreign key constraint of ParentId self-reference
        await DeleteCommentAndRepliesAsync(comment.Id);
        await _context.SaveChangesAsync();

        TempData["CommentSuccess"] = "Đã xóa bình luận thành công.";
        
        if (lessonId.HasValue)
        {
            return RedirectToAction("Details", "Lessons", new { id = lessonId.Value });
        }
        else
        {
            return RedirectToAction("Details", "Missions", new { id = missionId!.Value });
        }
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Report(int commentId, string reason)
    {
        var comment = await _context.Comments.FindAsync(commentId);
        if (comment == null)
            return NotFound();

        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim))
            return Challenge();

        var userId = Convert.ToInt32(userIdClaim);

        // Cannot report own comment
        if (comment.UserId == userId)
        {
            TempData["CommentError"] = "Bạn không thể báo cáo bình luận của chính mình.";
            return RedirectBack(comment);
        }

        if (string.IsNullOrWhiteSpace(reason))
        {
            TempData["CommentError"] = "Vui lòng chọn lý do báo cáo.";
            return RedirectBack(comment);
        }

        comment.IsReported = true;
        comment.ReportCount++;
        comment.ReportReason = reason;
        comment.ReportedAt = DateTime.UtcNow;

        _context.Comments.Update(comment);
        await _context.SaveChangesAsync();

        TempData["CommentSuccess"] = "Báo cáo bình luận đã được gửi. Cảm ơn đã giúp cộng đồng an toàn!";
        return RedirectBack(comment);
    }

    private IActionResult RedirectBack(Comment comment)
    {
        if (comment.LessonId.HasValue)
            return Redirect($"{Url.Action("Details", "Lessons", new { id = comment.LessonId.Value })}#comment-{comment.Id}");
        else
            return Redirect($"{Url.Action("Details", "Missions", new { id = comment.MissionId!.Value })}#comment-{comment.Id}");
    }

    private async Task DeleteCommentAndRepliesAsync(int commentId)
    {
        var comment = await _context.Comments
            .Include(c => c.InverseParent)
            .FirstOrDefaultAsync(c => c.Id == commentId);
            
        if (comment != null)
        {
            var childrenIds = comment.InverseParent.Select(c => c.Id).ToList();
            foreach (var childId in childrenIds)
            {
                await DeleteCommentAndRepliesAsync(childId);
            }
            
            _context.Comments.Remove(comment);
        }
    }
}
