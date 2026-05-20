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

        var lessons = _context.Lessons.Where(l => l.ChapterId == id);
        _context.Lessons.RemoveRange(lessons);

        _context.Chapters.Remove(chapter);
        await _context.SaveChangesAsync();

        return RedirectToAction("Content", "TeacherCourses", new { id = chapter.CourseId });
    }
}
