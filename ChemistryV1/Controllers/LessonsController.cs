using System;
using ChemistryV1.Models;
using ChemistryV1.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace ChemistryV1.Controllers;

[Authorize(Roles = "Admin,Teacher")]
public class LessonsController : Controller
{
    private readonly ElearningDbContext _context;
    private readonly IWebHostEnvironment _webHostEnvironment;

    public LessonsController(ElearningDbContext context, IWebHostEnvironment webHostEnvironment)
    {
        _context = context;
        _webHostEnvironment = webHostEnvironment;
    }

    [AllowAnonymous]
    public async Task<IActionResult> Details(int id)
    {
        var lesson = await _context.Lessons
            .Include(l => l.Chapter)
            .Include(l => l.VirtualLab)
            .Include(l => l.Comments)
                .ThenInclude(c => c.User)
            .FirstOrDefaultAsync(l => l.Id == id);

        if (lesson == null || lesson.ChapterId == null)
        {
            return NotFound();
        }

        var course = await _context.Courses
            .Include(c => c.Chapters)
                .ThenInclude(ch => ch.Lessons)
            .FirstOrDefaultAsync(c => c.Id == lesson.Chapter!.CourseId);

        if (course == null)
        {
            return NotFound();
        }

        if (lesson.IsPreview != true && !User.IsInRole("Admin") && !User.IsInRole("Teacher"))
        {
            if (User.Identity?.IsAuthenticated != true)
            {
                return RedirectToAction("Login", "Account", new { returnUrl = Request.Path });
            }

            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
            {
                return RedirectToAction("Login", "Account", new { returnUrl = Request.Path });
            }

            var userId = Convert.ToInt32(userIdClaim);
            var isEnrolled = await _context.CourseEnrollments.AnyAsync(ce => ce.CourseId == course.Id && ce.StudentId == userId);
            if (!isEnrolled)
            {
                TempData["EnrollError"] = "Bạn cần đăng ký tham gia khóa học này để bắt đầu bài học.";
                return RedirectToAction("Details", "Courses", new { id = course.Id });
            }
        }

        var viewModel = new LessonViewerViewModel
        {
            Course = course,
            Chapters = course.Chapters.OrderBy(ch => ch.OrderIndex).ToList(),
            Lesson = lesson
        };

        return View(viewModel);
    }

    public async Task<IActionResult> Create(int chapterId)
    {
        var viewModel = await BuildLessonEditorViewModel(chapterId, null);
        if (viewModel == null)
        {
            return NotFound();
        }

        viewModel.Lesson = new Lesson { ChapterId = chapterId, ContentType = "theory" };
        return View(viewModel);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(LessonEditorViewModel viewModel, IFormFile? videoFile, IFormFile? pdfFile, IFormFile? attachmentFile)
    {
        if (viewModel.Lesson == null || viewModel.Lesson.ChapterId == null)
        {
            return NotFound();
        }

        if (!ModelState.IsValid)
        {
            var fallback = await BuildLessonEditorViewModel(viewModel.Lesson.ChapterId.Value, viewModel.Lesson);
            return View(fallback ?? viewModel);
        }

        var uploadedVideo = await SaveFileAsync(videoFile, "videos");
        if (uploadedVideo != null) viewModel.Lesson.VideoUrl = uploadedVideo;

        var uploadedPdf = await SaveFileAsync(pdfFile, "pdfs");
        if (uploadedPdf != null) viewModel.Lesson.PdfPath = uploadedPdf;

        var uploadedAttachment = await SaveFileAsync(attachmentFile, "attachments");
        if (uploadedAttachment != null) viewModel.Lesson.AttachmentPath = uploadedAttachment;

        viewModel.Lesson.CreatedAt = DateTime.Now;
        _context.Lessons.Add(viewModel.Lesson);
        await _context.SaveChangesAsync();

        var chapter = await _context.Chapters.FindAsync(viewModel.Lesson.ChapterId);
        return RedirectToAction("Content", "TeacherCourses", new { id = chapter?.CourseId });
    }

    public async Task<IActionResult> Edit(int id)
    {
        var lesson = await _context.Lessons.FindAsync(id);
        if (lesson == null || lesson.ChapterId == null)
        {
            return NotFound();
        }

        var viewModel = await BuildLessonEditorViewModel(lesson.ChapterId.Value, lesson);
        if (viewModel == null)
        {
            return NotFound();
        }

        return View(viewModel);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, LessonEditorViewModel viewModel, IFormFile? videoFile, IFormFile? pdfFile, IFormFile? attachmentFile)
    {
        if (viewModel.Lesson == null || id != viewModel.Lesson.Id)
        {
            return NotFound();
        }
        if (viewModel.Lesson.ChapterId == null)
        {
            return NotFound();
        }

        if (!ModelState.IsValid)
        {
            var fallback = await BuildLessonEditorViewModel(viewModel.Lesson.ChapterId.Value, viewModel.Lesson);
            return View(fallback ?? viewModel);
        }

        var dbLesson = await _context.Lessons.FindAsync(id);
        if (dbLesson == null)
        {
            return NotFound();
        }

        var uploadedVideo = await SaveFileAsync(videoFile, "videos");
        var uploadedPdf = await SaveFileAsync(pdfFile, "pdfs");
        var uploadedAttachment = await SaveFileAsync(attachmentFile, "attachments");

        dbLesson.Title = viewModel.Lesson.Title;
        dbLesson.ContentType = viewModel.Lesson.ContentType;
        dbLesson.DocumentContent = viewModel.Lesson.DocumentContent;
        dbLesson.IsPreview = viewModel.Lesson.IsPreview;
        dbLesson.OrderIndex = viewModel.Lesson.OrderIndex;
        dbLesson.CommentsEnabled = viewModel.Lesson.CommentsEnabled;
        dbLesson.VirtualLabId = viewModel.Lesson.VirtualLabId;

        if (uploadedVideo != null) dbLesson.VideoUrl = uploadedVideo;
        else if (!string.IsNullOrWhiteSpace(viewModel.Lesson.VideoUrl)) dbLesson.VideoUrl = viewModel.Lesson.VideoUrl;

        if (uploadedPdf != null) dbLesson.PdfPath = uploadedPdf;
        else if (!string.IsNullOrWhiteSpace(viewModel.Lesson.PdfPath)) dbLesson.PdfPath = viewModel.Lesson.PdfPath;

        if (uploadedAttachment != null) dbLesson.AttachmentPath = uploadedAttachment;
        else if (!string.IsNullOrWhiteSpace(viewModel.Lesson.AttachmentPath)) dbLesson.AttachmentPath = viewModel.Lesson.AttachmentPath;

        await _context.SaveChangesAsync();

        var chapter = await _context.Chapters.FindAsync(viewModel.Lesson.ChapterId);
        return RedirectToAction("Content", "TeacherCourses", new { id = chapter?.CourseId });
    }

    private async Task<string?> SaveFileAsync(IFormFile? file, string subfolder)
    {
        if (file == null || file.Length == 0) return null;

        var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads", subfolder);
        if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder);
        }

        var fileName = $"{Guid.NewGuid()}_{Path.GetFileName(file.FileName)}";
        var filePath = Path.Combine(uploadsFolder, fileName);

        using (var fileStream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(fileStream);
        }

        return $"/uploads/{subfolder}/{fileName}";
    }

    public async Task<IActionResult> Delete(int id)
    {
        var lesson = await _context.Lessons
            .Include(l => l.Chapter)
            .FirstOrDefaultAsync(l => l.Id == id);

        if (lesson == null)
        {
            return NotFound();
        }

        ViewBag.CourseId = lesson.Chapter?.CourseId;
        return View(lesson);
    }

    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        var lesson = await _context.Lessons.FindAsync(id);
        if (lesson == null)
        {
            return NotFound();
        }

        // Break self-referencing FK in Comments
        await _context.Comments
            .Where(c => c.LessonId == id)
            .ExecuteUpdateAsync(s => s.SetProperty(c => c.ParentId, (int?)null));

        // Delete all dependent entities
        await _context.Comments.Where(c => c.LessonId == id).ExecuteDeleteAsync();
        await _context.UserLessonProgresses.Where(p => p.LessonId == id).ExecuteDeleteAsync();
        await _context.LessonSubmissions.Where(s => s.LessonId == id).ExecuteDeleteAsync();

        // Finally delete the Lesson
        await _context.Lessons.Where(l => l.Id == id).ExecuteDeleteAsync();

        var chapter = await _context.Chapters.FindAsync(lesson.ChapterId);
        return RedirectToAction("Content", "TeacherCourses", new { id = chapter?.CourseId });
    }

    private async Task<LessonEditorViewModel?> BuildLessonEditorViewModel(int chapterId, Lesson? lesson)
    {
        var chapter = await _context.Chapters.FindAsync(chapterId);
        if (chapter == null)
        {
            return null;
        }

        var course = await _context.Courses
            .Include(c => c.Chapters)
                .ThenInclude(ch => ch.Lessons)
            .FirstOrDefaultAsync(c => c.Id == chapter.CourseId);

        if (course == null)
        {
            return null;
        }

        
        var virtualLabs = await _context.VirtualLabs.ToListAsync();

        
        return new LessonEditorViewModel
        {
            Course = course,
            Chapters = course.Chapters.OrderBy(ch => ch.OrderIndex).ToList(),
            Lesson = lesson ?? new Lesson { ChapterId = chapterId },
            AvailableVirtualLabs = virtualLabs 
        };
    }
}
