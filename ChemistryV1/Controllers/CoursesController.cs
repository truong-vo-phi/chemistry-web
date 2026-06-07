using System;
using ChemistryV1.Models;
using ChemistryV1.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

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
                .Where(u => u.Role != null && u.Role.ToLower() == "admin")
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

            .Include(c => c.Reviews)
                .ThenInclude(r => r.User)

            .FirstOrDefaultAsync(c => c.Id == id);

        if (course == null)
        {
            return NotFound();
        }

        if (course.Status?.ToLower() != "published" && !User.IsInRole("Admin"))
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
            TempData["EnrollSuccess"] = "Đăng ký khóa học thành công!";
        }
        else
        {
            TempData["EnrollError"] = "Bạn đã đăng ký khóa học này rồi.";
        }
        return RedirectToAction(nameof(Details), new { id });
    }


    [HttpPost]
    [Authorize]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> AddReview(int courseId, int rating, string content)
    {
        if (rating < 1 || rating > 5)
        {
            TempData["ReviewError"] = "Đánh giá sao phải từ 1 đến 5.";
            return RedirectToAction(nameof(Details), new { id = courseId });
        }

        var course = await _context.Courses.FindAsync(courseId);
        if (course == null)
        {
            return NotFound();
        }

        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim))
        {
            return Challenge();
        }

        var userId = Convert.ToInt32(userIdClaim);
        var normalizedContent = string.IsNullOrWhiteSpace(content) ? null : content.Trim();

        var isEnrolled = await _context.CourseEnrollments.AnyAsync(ce => ce.CourseId == courseId && ce.StudentId == userId);
        bool canReview = isEnrolled || User.IsInRole("Admin");
        if (!canReview)
        {
            TempData["ReviewError"] = "Bạn cần tham gia khóa học này để có thể gửi đánh giá.";
            return RedirectToAction(nameof(Details), new { id = courseId });
        }

        var existingReview = await _context.Reviews.FirstOrDefaultAsync(r => r.CourseId == courseId && r.UserId == userId);
        if (existingReview != null)
        {
            existingReview.Rating = rating;
            existingReview.Content = normalizedContent;
            existingReview.CreatedAt = DateTime.Now;
            _context.Reviews.Update(existingReview);
            TempData["ReviewSuccess"] = "Đã cập nhật đánh giá của bạn thành công!";

        }
        else
        {
            var review = new Review
            {
                CourseId = courseId,
                UserId = userId,
                Rating = rating,

                Content = normalizedContent,
                CreatedAt = DateTime.Now
            };
            _context.Reviews.Add(review);
            TempData["ReviewSuccess"] = "Cảm ơn bạn đã đánh giá khóa học!";

        }

        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Details), new { id = courseId });
    }

    [HttpPost]

    [Authorize]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteReview(int id)
    {
        var review = await _context.Reviews.FindAsync(id);

        if (review == null)
        {
            return NotFound();
        }


        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim))
        {
            return Challenge();
        }

        var userId = Convert.ToInt32(userIdClaim);

        bool canDelete = review.UserId == userId || User.IsInRole("Admin");
        if (!canDelete)

        {
            return Forbid();
        }


        int courseId = review.CourseId ?? 0;
        _context.Reviews.Remove(review);
        await _context.SaveChangesAsync();

        TempData["ReviewSuccess"] = "Đã xóa đánh giá thành công.";
        return RedirectToAction(nameof(Details), new { id = courseId });
    }

}
