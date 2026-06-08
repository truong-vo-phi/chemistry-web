using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ChemistryV1.Models;
using ChemistryV1.ViewModels;

namespace ChemistryV1.Controllers;

[Authorize(Roles = "Admin")]
public class DashboardController : Controller
{
    private readonly ElearningDbContext _context;

    public DashboardController(ElearningDbContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index()
    {
        // Gather real database stats to show in dashboard.
        var totalUsers = await _context.Users.CountAsync();
        var totalStudents = await _context.Users.CountAsync(u => u.Role == "Student");
        var totalCourses = await _context.Courses.CountAsync();
        var totalLessons = await _context.Lessons.CountAsync();
        var totalCategories = await _context.Categories.CountAsync();
        var totalEnrollments = await _context.CourseEnrollments.CountAsync();

        ViewBag.TotalUsers = totalUsers;
        ViewBag.TotalStudents = totalStudents;
        ViewBag.TotalCourses = totalCourses;
        ViewBag.TotalLessons = totalLessons;
        ViewBag.TotalCategories = totalCategories;
        ViewBag.TotalEnrollments = totalEnrollments;

        var today = DateTime.Today;
        var currentWeekStart = today.AddDays(-6);
        var previousWeekStart = today.AddDays(-13);
        var currentWeekUsers = await _context.Users.CountAsync(u => u.CreatedAt >= currentWeekStart);
        var previousWeekUsers = await _context.Users.CountAsync(u => u.CreatedAt >= previousWeekStart && u.CreatedAt < currentWeekStart);
        var growth = previousWeekUsers == 0
            ? (currentWeekUsers > 0 ? 100 : 0)
            : (int)Math.Round((double)(currentWeekUsers - previousWeekUsers) / previousWeekUsers * 100);
        ViewBag.UserGrowth = growth >= 0 ? $"+{growth}%" : $"{growth}%";
        ViewBag.PendingReports = await _context.Comments.CountAsync(c => c.IsReported && c.AdminAction == null);
        ViewBag.AdminUsers = await _context.Users.CountAsync(u => u.Role == "Admin");
        ViewBag.ActiveUsers = await _context.Users.CountAsync(u => u.IsActive == true);
        ViewBag.InactiveUsers = await _context.Users.CountAsync(u => u.IsActive != true);
        
        var totalProgresses = await _context.UserLessonProgresses.CountAsync();
        var completedProgresses = await _context.UserLessonProgresses.CountAsync(p => p.IsCompleted == true);
        var completionRate = totalProgresses > 0 ? (int)Math.Round((double)completedProgresses / totalProgresses * 100) : 0;
        ViewBag.CompletionRate = completionRate;

        var recentUsers = await _context.Users
            .Where(u => u.CreatedAt >= currentWeekStart)
            .Select(u => u.CreatedAt)
            .ToListAsync();
        var weeklyActivity = Enumerable.Range(0, 7)
            .Select(offset =>
            {
                var day = currentWeekStart.AddDays(offset).Date;
                return recentUsers.Count(createdAt => createdAt.HasValue && createdAt.Value.Date == day);
            })
            .ToArray();
        ViewBag.WeeklyActivity = weeklyActivity;

        // Recent Courses
        var recentCourses = await _context.Courses
            .Include(c => c.Teacher)
            .OrderByDescending(c => c.CreatedAt)
            .Take(5)
            .ToListAsync();
        ViewBag.RecentCourses = recentCourses;

        return View();
    }
}
