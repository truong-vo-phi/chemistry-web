using System;
using System.Text.RegularExpressions;
using ChemistryV1.Models;
using ChemistryV1.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authorization;

namespace ChemistryV1.Controllers;

[Authorize(Roles = "Admin")]
public class TeacherCoursesController : Controller
{
    private readonly ElearningDbContext _context;
    private readonly IWebHostEnvironment _webHostEnvironment;

    public TeacherCoursesController(ElearningDbContext context, IWebHostEnvironment webHostEnvironment)
    {
        _context = context;
        _webHostEnvironment = webHostEnvironment;
    }

    public async Task<IActionResult> Index(string? search, int? teacherId)
    {
        var query = _context.Courses
            .Include(c => c.Teacher)
            .Include(c => c.CourseCategories)
                .ThenInclude(cc => cc.Category)
            .Include(c => c.CourseEnrollments)
            .Include(c => c.Chapters)
                .ThenInclude(ch => ch.Lessons)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(c =>
                (c.Title != null && EF.Functions.Like(c.Title, $"%{search}%")) ||
                (c.Description != null && EF.Functions.Like(c.Description, $"%{search}%")));
        }

        if (teacherId.HasValue)
        {
            query = query.Where(c => c.TeacherId == teacherId);
        }

        var viewModel = new TeacherCoursesIndexViewModel
        {
            Search = search,
            TeacherId = teacherId,
            Teachers = await _context.Users
                .Where(u => u.Role != null && u.Role.ToLower() == "admin")
                .OrderBy(u => u.FullName)
                .ToListAsync(),
            Courses = await query
                .OrderByDescending(c => c.CreatedAt)
                .ToListAsync()
        };

        return View(viewModel);
    }

    public async Task<IActionResult> Create()
    {
        var viewModel = new TeacherCourseEditViewModel
        {
            Status = "draft",
            Categories = await _context.Categories.OrderBy(c => c.Name).ToListAsync(),
            Teachers = await _context.Users
                .Where(u => u.Role != null && u.Role.ToLower() == "admin")
                .OrderBy(u => u.FullName)
                .ToListAsync()
        };

        return View(viewModel);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(TeacherCourseEditViewModel viewModel)
    {
        viewModel.Slug = NormalizeSlug(viewModel.Slug, viewModel.Title);

        if (await SlugExists(viewModel.Slug))
        {
            ModelState.AddModelError(nameof(viewModel.Slug), "Slug đã tồn tại.");
        }

        if (!ModelState.IsValid)
        {
            viewModel.Categories = await _context.Categories.OrderBy(c => c.Name).ToListAsync();
            viewModel.Teachers = await _context.Users
                .Where(u => u.Role != null && u.Role.ToLower() == "admin")
                .OrderBy(u => u.FullName)
                .ToListAsync();
            return View(viewModel);
        }

        var course = new Course
        {
            Title = viewModel.Title,
            Slug = viewModel.Slug,
            Description = viewModel.Description,
            ThumbnailUrl = viewModel.ThumbnailUrl,
            Status = viewModel.Status ?? "draft",
            TeacherId = viewModel.TeacherId,
            CreatedAt = DateTime.Now
        };

        _context.Courses.Add(course);
        await _context.SaveChangesAsync();

        await UpdateCourseCategories(course.Id, viewModel.SelectedCategoryIds);

        return RedirectToAction(nameof(Index));
    }

    public async Task<IActionResult> Edit(int id)
    {
        var course = await _context.Courses
            .Include(c => c.CourseCategories)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (course == null)
        {
            return NotFound();
        }

        var viewModel = new TeacherCourseEditViewModel
        {
            Id = course.Id,
            Title = course.Title,
            Slug = course.Slug,
            Description = course.Description,
            ThumbnailUrl = course.ThumbnailUrl,
            Status = course.Status,
            TeacherId = course.TeacherId,
            SelectedCategoryIds = course.CourseCategories.Select(cc => cc.CategoryId).ToList(),
            Categories = await _context.Categories.OrderBy(c => c.Name).ToListAsync(),
            Teachers = await _context.Users
                .Where(u => u.Role != null && u.Role.ToLower() == "admin")
                .OrderBy(u => u.FullName)
                .ToListAsync()
        };

        return View(viewModel);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, TeacherCourseEditViewModel viewModel)
    {
        if (id != viewModel.Id)
        {
            return NotFound();
        }

        viewModel.Slug = NormalizeSlug(viewModel.Slug, viewModel.Title);

        if (await SlugExists(viewModel.Slug, id))
        {
            ModelState.AddModelError(nameof(viewModel.Slug), "Slug đã tồn tại.");
        }

        if (!ModelState.IsValid)
        {
            viewModel.Categories = await _context.Categories.OrderBy(c => c.Name).ToListAsync();
            viewModel.Teachers = await _context.Users
                .Where(u => u.Role != null && u.Role.ToLower() == "admin")
                .OrderBy(u => u.FullName)
                .ToListAsync();
            return View(viewModel);
        }

        var course = await _context.Courses.FindAsync(id);
        if (course == null)
        {
            return NotFound();
        }

        // Xử lý file upload ảnh bìa
        if (viewModel.ThumbnailFile != null && viewModel.ThumbnailFile.Length > 0)
        {
            var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads", "thumbnails");
            Directory.CreateDirectory(uploadsFolder);

            var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(viewModel.ThumbnailFile.FileName);
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await viewModel.ThumbnailFile.CopyToAsync(stream);
            }

            // Ghi đường dẫn tương đối vào DB (để hiển thị trên web)
            course.ThumbnailUrl = "/uploads/thumbnails/" + uniqueFileName;
        }
        else if (!string.IsNullOrWhiteSpace(viewModel.ThumbnailUrl))
        {
            // Nếu không upload file, nhưng có nhập URL text thì dùng URL đó
            course.ThumbnailUrl = viewModel.ThumbnailUrl;
        }

        course.Title = viewModel.Title;
        course.Slug = viewModel.Slug;
        course.Description = viewModel.Description;
        course.Status = viewModel.Status ?? "draft";
        course.TeacherId = viewModel.TeacherId;

        await _context.SaveChangesAsync();
        await UpdateCourseCategories(course.Id, viewModel.SelectedCategoryIds);

        return RedirectToAction(nameof(Index));
    }

    public async Task<IActionResult> Delete(int id)
    {
        var course = await _context.Courses
            .Include(c => c.CourseCategories)
                .ThenInclude(cc => cc.Category)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (course == null)
        {
            return NotFound();
        }

        return View(course);
    }

    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        var course = await _context.Courses.FindAsync(id);
        if (course == null)
        {
            return NotFound();
        }

        // 1. Break self-referencing FK in Comments to avoid constraint errors during deletion
        await _context.Comments
            .Where(c => c.Lesson.Chapter.CourseId == id)
            .ExecuteUpdateAsync(s => s.SetProperty(c => c.ParentId, (int?)null));

        // 2. Delete all Lesson-dependent entities
        await _context.Comments.Where(c => c.Lesson.Chapter.CourseId == id).ExecuteDeleteAsync();
        await _context.UserLessonProgresses.Where(p => p.Lesson.Chapter.CourseId == id).ExecuteDeleteAsync();
        await _context.LessonSubmissions.Where(s => s.Lesson.Chapter.CourseId == id).ExecuteDeleteAsync();
        
        // 3. Delete Lessons and Chapters
        await _context.Lessons.Where(l => l.Chapter.CourseId == id).ExecuteDeleteAsync();
        await _context.Chapters.Where(c => c.CourseId == id).ExecuteDeleteAsync();

        // 4. Delete Quiz/Revision-dependent entities
        await _context.QuizDetailedAnswers.Where(q => q.Question.CourseId == id).ExecuteDeleteAsync();
        await _context.QuizResults.Where(q => q.Revision.CourseId == id).ExecuteDeleteAsync();
        await _context.Questions.Where(q => q.CourseId == id).ExecuteDeleteAsync();
        await _context.Revisions.Where(r => r.CourseId == id).ExecuteDeleteAsync();

        // 5. Delete Course-dependent entities
        await _context.CourseEnrollments.Where(e => e.CourseId == id).ExecuteDeleteAsync();
        await _context.Reviews.Where(r => r.CourseId == id).ExecuteDeleteAsync();
        await _context.CourseCategories.Where(c => c.CourseId == id).ExecuteDeleteAsync();

        // 6. Finally delete the Course
        await _context.Courses.Where(c => c.Id == id).ExecuteDeleteAsync();

        return RedirectToAction(nameof(Index));
    }

    [HttpPost]
    public async Task<IActionResult> ToggleStatus(int id)
    {
        var course = await _context.Courses.FindAsync(id);
        if (course == null)
        {
            return NotFound();
        }

        course.Status = (course.Status?.ToLower() == "published") ? "draft" : "published";
        await _context.SaveChangesAsync();

        return Json(new { success = true, newStatus = course.Status });
    }

    public async Task<IActionResult> Content(int id)
    {
        var course = await _context.Courses
            .Include(c => c.Chapters)
                .ThenInclude(ch => ch.Lessons)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (course == null)
        {
            return NotFound();
        }

        var viewModel = new CourseContentViewModel
        {
            Course = course,
            Chapters = course.Chapters.OrderBy(ch => ch.OrderIndex).ToList()
        };

        return View(viewModel);
    }

    private async Task UpdateCourseCategories(int courseId, IEnumerable<int> selectedCategoryIds)
    {
        var existing = await _context.CourseCategories
            .Where(cc => cc.CourseId == courseId)
            .ToListAsync();

        _context.CourseCategories.RemoveRange(existing);

        foreach (var categoryId in selectedCategoryIds.Distinct())
        {
            _context.CourseCategories.Add(new CourseCategory
            {
                CourseId = courseId,
                CategoryId = categoryId
            });
        }

        await _context.SaveChangesAsync();
    }

    private async Task<bool> SlugExists(string? slug, int? excludeId = null)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            return false;
        }

        return await _context.Courses.AnyAsync(c =>
            c.Slug == slug && (!excludeId.HasValue || c.Id != excludeId));
    }

    private static string NormalizeSlug(string? slug, string? title)
    {
        var baseText = string.IsNullOrWhiteSpace(slug) ? title : slug;
        if (string.IsNullOrWhiteSpace(baseText))
        {
            return Guid.NewGuid().ToString("N");
        }

        var cleaned = Regex.Replace(baseText.Trim().ToLowerInvariant(), @"[^\w\s-]", "");
        cleaned = Regex.Replace(cleaned, @"\s+", "-");
        return cleaned;
    }
}
