using System;
using ChemistryV1.Models;
using ChemistryV1.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChemistryV1.Controllers;

public class CoursesController : Controller
{
    private readonly ElearningDbContext _context;

    public CoursesController(ElearningDbContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Library(string? search, int? categoryId, int? teacherId)
    {
        var coursesQuery = _context.Courses
            .Include(c => c.Teacher)
            .Include(c => c.CourseCategories)
                .ThenInclude(cc => cc.Category)
            .Include(c => c.CourseEnrollments)
            .Where(c => c.Status != null && c.Status.ToLower() == "published");

        if (!string.IsNullOrWhiteSpace(search))
        {
            coursesQuery = coursesQuery.Where(c =>
                (c.Title != null && EF.Functions.Like(c.Title, $"%{search}%")) ||
                (c.Description != null && EF.Functions.Like(c.Description, $"%{search}%")));
        }

        if (categoryId.HasValue)
        {
            coursesQuery = coursesQuery.Where(c => c.CourseCategories.Any(cc => cc.CategoryId == categoryId));
        }

        if (teacherId.HasValue)
        {
            coursesQuery = coursesQuery.Where(c => c.TeacherId == teacherId);
        }

        var viewModel = new CourseLibraryViewModel
        {
            Search = search,
            CategoryId = categoryId,
            TeacherId = teacherId,
            Categories = await _context.Categories.OrderBy(c => c.Name).ToListAsync(),
            Teachers = await _context.Users
                .Where(u => u.Role != null && u.Role.ToLower() == "teacher")
                .OrderBy(u => u.FullName)
                .ToListAsync(),
            Courses = await coursesQuery
                .OrderByDescending(c => c.CreatedAt)
                .ToListAsync()
        };

        return View(viewModel);
    }

    public async Task<IActionResult> Details(int id)
    {
        var course = await _context.Courses
            .Include(c => c.Teacher)
            .Include(c => c.CourseCategories)
                .ThenInclude(cc => cc.Category)
            .Include(c => c.Chapters)
                .ThenInclude(ch => ch.Lessons)
            .Include(c => c.CourseEnrollments)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (course == null)
        {
            return NotFound();
        }

        var chapters = course.Chapters
            .OrderBy(ch => ch.OrderIndex)
            .ToList();

        var viewModel = new CourseDetailsViewModel
        {
            Course = course,
            Chapters = chapters,
            TotalLessons = chapters.Sum(ch => ch.Lessons.Count)
        };

        return View(viewModel);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Enroll(int id)
    {
        if (User.Identity?.IsAuthenticated != true)
        {
            return RedirectToAction("Login", "Account", new { returnUrl = Url.Action("Details", "Courses", new { id = id }) });
        }

        var course = await _context.Courses.FindAsync(id);
        if (course == null)
        {
            return NotFound();
        }

        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var studentId))
        {
            TempData["EnrollError"] = "Không thể xác định thông tin tài khoản học sinh.";
            return RedirectToAction(nameof(Details), new { id });
        }

        var student = await _context.Users.FindAsync(studentId);
        if (student == null)
        {
            TempData["EnrollError"] = "Tài khoản học sinh không tồn tại.";
            return RedirectToAction(nameof(Details), new { id });
        }

        var alreadyEnrolled = await _context.CourseEnrollments
            .AnyAsync(e => e.CourseId == id && e.StudentId == student.Id);

        if (!alreadyEnrolled)
        {
            _context.CourseEnrollments.Add(new CourseEnrollment
            {
                CourseId = id,
                StudentId = student.Id,
                EnrolledAt = DateTime.Now
            });
            await _context.SaveChangesAsync();
        }

        TempData["EnrollSuccess"] = "Đăng ký khóa học thành công!";
        return RedirectToAction(nameof(Details), new { id });
    }
}
