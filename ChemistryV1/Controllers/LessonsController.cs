using System;
using ChemistryV1.Models;
using ChemistryV1.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChemistryV1.Controllers;

public class LessonsController : Controller
{
    private readonly ElearningDbContext _context;

    public LessonsController(ElearningDbContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Details(int id)
    {
        var lesson = await _context.Lessons
            .Include(l => l.Chapter)
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
    public async Task<IActionResult> Create(LessonEditorViewModel viewModel)
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
    public async Task<IActionResult> Edit(int id, LessonEditorViewModel viewModel)
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

        _context.Update(viewModel.Lesson);
        await _context.SaveChangesAsync();

        var chapter = await _context.Chapters.FindAsync(viewModel.Lesson.ChapterId);
        return RedirectToAction("Content", "TeacherCourses", new { id = chapter?.CourseId });
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

        _context.Lessons.Remove(lesson);
        await _context.SaveChangesAsync();

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

        return new LessonEditorViewModel
        {
            Course = course,
            Chapters = course.Chapters.OrderBy(ch => ch.OrderIndex).ToList(),
            Lesson = lesson ?? new Lesson { ChapterId = chapterId }
        };
    }
}
