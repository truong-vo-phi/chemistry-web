using ChemistryV1.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChemistryV1.Controllers;

public class ChaptersController : Controller
{
    private readonly ElearningDbContext _context;

    public ChaptersController(ElearningDbContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Create(int courseId)
    {
        var course = await _context.Courses.FindAsync(courseId);
        if (course == null)
        {
            return NotFound();
        }

        ViewBag.CourseTitle = course.Title;
        return View(new Chapter { CourseId = courseId });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(Chapter chapter)
    {
        if (!ModelState.IsValid)
        {
            return View(chapter);
        }

        _context.Chapters.Add(chapter);
        await _context.SaveChangesAsync();

        return RedirectToAction("Content", "TeacherCourses", new { id = chapter.CourseId });
    }

    public async Task<IActionResult> Edit(int id)
    {
        var chapter = await _context.Chapters.FindAsync(id);
        if (chapter == null)
        {
            return NotFound();
        }

        var course = await _context.Courses.FindAsync(chapter.CourseId);
        ViewBag.CourseTitle = course?.Title;
        return View(chapter);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, Chapter chapter)
    {
        if (id != chapter.Id)
        {
            return NotFound();
        }

        if (!ModelState.IsValid)
        {
            return View(chapter);
        }

        _context.Update(chapter);
        await _context.SaveChangesAsync();

        return RedirectToAction("Content", "TeacherCourses", new { id = chapter.CourseId });
    }

    public async Task<IActionResult> Delete(int id)
    {
        var chapter = await _context.Chapters
            .Include(c => c.Course)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (chapter == null)
        {
            return NotFound();
        }

        return View(chapter);
    }

    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        var chapter = await _context.Chapters.FindAsync(id);
        if (chapter == null)
        {
            return NotFound();
        }

        // 1. Break self-referencing FK in Comments
        await _context.Comments
            .Where(c => c.Lesson.ChapterId == id)
            .ExecuteUpdateAsync(s => s.SetProperty(c => c.ParentId, (int?)null));

        // 2. Delete all Lesson-dependent entities
        await _context.Comments.Where(c => c.Lesson.ChapterId == id).ExecuteDeleteAsync();
        await _context.UserLessonProgresses.Where(p => p.Lesson.ChapterId == id).ExecuteDeleteAsync();
        await _context.LessonSubmissions.Where(s => s.Lesson.ChapterId == id).ExecuteDeleteAsync();
        
        // 3. Delete Lessons and Chapter
        await _context.Lessons.Where(l => l.ChapterId == id).ExecuteDeleteAsync();
        await _context.Chapters.Where(c => c.Id == id).ExecuteDeleteAsync();

        return RedirectToAction("Content", "TeacherCourses", new { id = chapter.CourseId });
    }
}
