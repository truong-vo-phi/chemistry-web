using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ChemistryV1.Models;
using ChemistryV1.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChemistryV1.Controllers;

[Authorize]
public class MissionsController : Controller
{
    private readonly ElearningDbContext _context;

    public MissionsController(ElearningDbContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Details(int id)
    {
        var userIdValue = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdValue, out var userId) || userId <= 0)
        {
            return RedirectToAction("Login", "Account");
        }

        var mission = await _context.SystemMissions
            .FirstOrDefaultAsync(m => m.Id == id && m.IsActive);

        if (mission == null)
        {
            return NotFound();
        }

        // Calculate progress dynamically
        var totalCompletedLessons = await _context.UserLessonProgresses
            .CountAsync(p => p.UserId == userId && p.IsCompleted == true);

        var totalQuizResults = await _context.QuizResults.CountAsync(q => q.StudentId == userId);

        var totalEnrollments = await _context.CourseEnrollments.CountAsync(e => e.StudentId == userId);

        var totalXpFromQuizzes = await _context.QuizResults
            .Where(q => q.StudentId == userId)
            .SumAsync(q => (double?)q.Score) ?? 0;

        var totalXp = (int)Math.Round(totalXpFromQuizzes) + (totalCompletedLessons * 50);

        var activityDates = new HashSet<DateOnly>();
        var quizDates = await _context.QuizResults
            .Where(q => q.StudentId == userId && q.CompletedAt != null)
            .Select(q => q.CompletedAt!.Value)
            .ToListAsync();

        var lessonDates = await _context.UserLessonProgresses
            .Where(p => p.UserId == userId && p.IsCompleted == true && p.CompletedAt != null)
            .Select(p => p.CompletedAt!.Value)
            .ToListAsync();

        foreach (var date in quizDates.Concat(lessonDates))
        {
            activityDates.Add(DateOnly.FromDateTime(date.Date));
        }

        var dayStreak = 0;
        var cursor = DateOnly.FromDateTime(DateTime.Today);
        while (activityDates.Contains(cursor))
        {
            dayStreak++;
            cursor = cursor.AddDays(-1);
        }

        int currentProgress = mission.MetricKey.ToLowerInvariant() switch
        {
            "lessons_completed" => totalCompletedLessons,
            "quizzes_completed" => totalQuizResults,
            "streak_days" => dayStreak,
            "enrollments_count" => totalEnrollments,
            "xp_total" => totalXp,
            _ => 0
        };

        // Load comments and build threaded replies for mission discussion
        var allComments = await _context.Comments
            .Include(c => c.User)
            .Where(c => c.MissionId == id)
            .OrderBy(c => c.CreatedAt)
            .ToListAsync();

        var commentLookup = allComments.ToDictionary(c => c.Id);
        foreach (var comment in allComments)
        {
            if (comment.ParentId.HasValue && commentLookup.TryGetValue(comment.ParentId.Value, out var parent))
            {
                parent.InverseParent.Add(comment);
            }
        }

        var topLevelComments = allComments
            .Where(c => c.ParentId == null)
            .OrderByDescending(c => c.CreatedAt)
            .ToList();

        var viewModel = new MissionDetailsViewModel
        {
            MissionId = mission.Id,
            Title = mission.Title,
            RewardText = mission.RewardText,
            Icon = mission.Icon,
            Tone = mission.ColorClass,
            Current = currentProgress,
            Target = mission.TargetValue,
            ProgressPercent = mission.TargetValue <= 0 ? 0 : Math.Min(100, (int)Math.Round(currentProgress * 100.0 / mission.TargetValue)),
            Completed = currentProgress >= mission.TargetValue,
            Comments = topLevelComments
        };

        return View(viewModel);
    }
}
