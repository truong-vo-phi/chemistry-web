using ChemistryV1.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ChemistryV1.Controllers.Api;

[Route("api/practice")]
[ApiController]
[Authorize]
public class PracticeController : ControllerBase
{
    private readonly ElearningDbContext _context;

    public PracticeController(ElearningDbContext context)
    {
        _context = context;
    }

    public class PracticeSubmitModel
    {
        public int LessonId { get; set; }
        public double Score { get; set; }
    }

    [HttpPost("submit")]
    public async Task<IActionResult> SubmitScore([FromBody] PracticeSubmitModel model)
    {
        var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!int.TryParse(userIdString, out int studentId)) return Unauthorized();

        // 1. Lưu vào LessonSubmissions (đại diện cho bảng điểm)
        var submission = await _context.LessonSubmissions
            .FirstOrDefaultAsync(s => s.LessonId == model.LessonId && s.StudentId == studentId);

        if (submission == null)
        {
            submission = new LessonSubmission { LessonId = model.LessonId, StudentId = studentId, Score = model.Score, CreatedAt = DateTime.Now };
            _context.LessonSubmissions.Add(submission);
        }
        else if (model.Score > (submission.Score ?? 0)) // Chỉ lưu nếu điểm mới cao hơn
        {
            submission.Score = model.Score;
            submission.CreatedAt = DateTime.Now;
        }

        // 2. Đánh dấu UserLessonProgress thành đã hoàn thành
        var progress = await _context.UserLessonProgresses
            .FirstOrDefaultAsync(p => p.LessonId == model.LessonId && p.UserId == studentId);

        if (progress == null) _context.UserLessonProgresses.Add(new UserLessonProgress { UserId = studentId, LessonId = model.LessonId, IsCompleted = true, CompletedAt = DateTime.Now });
        else { progress.IsCompleted = true; progress.CompletedAt = DateTime.Now; }

        await _context.SaveChangesAsync();
        return Ok(new { success = true, score = submission.Score });
    }
}