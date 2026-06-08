using System.Net;
using System.Text.RegularExpressions;
using ChemistryV1.Models;
using ChemistryV1.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChemistryV1.Controllers;

[Authorize]
public class PracticeQuestionsController : Controller
{
    private readonly ElearningDbContext _context;

    public PracticeQuestionsController(ElearningDbContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index(int? courseId, int? lessonId)
    {
        var isAdmin = User.IsInRole("Admin");
        var coursesQuery = _context.Courses
            .AsNoTracking()
            .Include(c => c.Chapters)
                .ThenInclude(ch => ch.Lessons)
            .Include(c => c.Questions)
            .AsQueryable();

        if (!isAdmin)
        {
            coursesQuery = coursesQuery.Where(c => c.Status != null && c.Status.ToLower() == "published");
        }

        var courses = await coursesQuery
            .OrderByDescending(c => c.CreatedAt)
            .ToListAsync();

        var deckCourses = courses
            .Select(course => new PracticeCourseDeckViewModel
            {
                Id = course.Id,
                Title = course.Title ?? $"Course {course.Id}",
                Lessons = course.Chapters
                    .OrderBy(ch => ch.OrderIndex)
                    .SelectMany(ch => ch.Lessons
                        .OrderBy(lesson => lesson.OrderIndex)
                        .Select(lesson => new PracticeLessonDeckViewModel
                        {
                            Id = lesson.Id,
                            Title = lesson.Title ?? $"Lesson {lesson.Id}",
                            ChapterTitle = ch.Title ?? "Chapter",
                            IsPreview = lesson.IsPreview == true
                        }))
                    .ToList()
            })
            .Where(c => c.Lessons.Count > 0)
            .ToList();

        var selectedCourseDeck = deckCourses.FirstOrDefault(c => c.Id == courseId) ?? deckCourses.FirstOrDefault();
        var selectedCourseEntity = selectedCourseDeck == null
            ? null
            : courses.FirstOrDefault(c => c.Id == selectedCourseDeck.Id);

        var selectedLessonDeck = selectedCourseDeck?.Lessons.FirstOrDefault(lesson => lesson.Id == lessonId)
            ?? selectedCourseDeck?.Lessons.FirstOrDefault();

        Lesson? selectedLessonEntity = null;
        if (selectedCourseEntity != null && selectedLessonDeck != null)
        {
            selectedLessonEntity = selectedCourseEntity.Chapters
                .SelectMany(ch => ch.Lessons)
                .FirstOrDefault(lesson => lesson.Id == selectedLessonDeck.Id);
        }

        var selectedSummary = BuildLessonSummary(selectedLessonEntity?.DocumentContent);
        var flashcards = BuildFlashcards(selectedLessonEntity, selectedCourseEntity);

        var viewModel = new PracticeFlashcardsViewModel
        {
            Courses = deckCourses,
            SelectedCourseId = selectedCourseDeck?.Id,
            SelectedLessonId = selectedLessonDeck?.Id,
            SelectedCourseTitle = selectedCourseDeck?.Title ?? "Chưa có khóa học",
            SelectedLessonTitle = selectedLessonDeck?.Title ?? "Chưa có bài học",
            SelectedLessonSummary = selectedSummary,
            TotalCards = flashcards.Count,
            Flashcards = flashcards
        };

        return View(viewModel);
    }

    private static string BuildLessonSummary(string? rawContent)
    {
        if (string.IsNullOrWhiteSpace(rawContent))
        {
            return "Bài học này chưa có mô tả chi tiết trong cơ sở dữ liệu.";
        }

        var plain = ToPlainText(rawContent);
        if (plain.Length <= 220)
        {
            return plain;
        }

        return plain[..220].Trim() + "...";
    }

    private static List<PracticeFlashcardItemViewModel> BuildFlashcards(Lesson? lesson, Course? course)
    {
        var cards = new List<PracticeFlashcardItemViewModel>();
        if (lesson == null)
        {
            return cards;
        }

        var title = string.IsNullOrWhiteSpace(lesson.Title) ? "Bài học này" : lesson.Title!.Trim();
        var plainContent = ToPlainText(lesson.DocumentContent);
        var sentences = SplitSentences(plainContent);
        var seenFront = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

        void AddCard(string front, string back, string tag)
        {
            var normalizedFront = front.Trim();
            var normalizedBack = back.Trim();
            if (normalizedFront.Length < 5 || normalizedBack.Length < 5 || seenFront.Contains(normalizedFront))
            {
                return;
            }

            seenFront.Add(normalizedFront);
            cards.Add(new PracticeFlashcardItemViewModel
            {
                Index = cards.Count + 1,
                Front = normalizedFront,
                Back = normalizedBack,
                Tag = tag
            });
        }

        var openingAnswer = sentences.FirstOrDefault() ?? $"Nội dung chính xoay quanh chủ đề \"{title}\".";
        AddCard($"Chủ đề chính của bài \"{title}\" là gì?", openingAnswer, "Overview");

        var definitionRegex = new Regex(@"(?<term>[A-Za-zÀ-ỹ0-9\(\)\-\+\s]{3,60})\s+là\s+(?<def>[^\.!\?;:]{8,220})", RegexOptions.IgnoreCase);
        var definitionMatches = definitionRegex.Matches(plainContent);
        foreach (Match match in definitionMatches.Cast<Match>().Take(4))
        {
            var term = match.Groups["term"].Value.Trim();
            var def = match.Groups["def"].Value.Trim();
            if (term.Length >= 3 && def.Length >= 8)
            {
                AddCard($"{term} là gì?", def, "Definition");
            }
        }

        foreach (var sentence in sentences.Where(sentence => sentence.Length >= 25).Take(6))
        {
            AddCard($"Ý chính cần nhớ trong \"{title}\"?", sentence, "Key Point");
        }

        if (course != null)
        {
            foreach (var question in course.Questions.Where(q => !string.IsNullOrWhiteSpace(q.Content)).Take(4))
            {
                var answer = string.IsNullOrWhiteSpace(question.CorrectAnswer)
                    ? "Xem lại nội dung bài học để tự trả lời câu hỏi này."
                    : question.CorrectAnswer!.Trim();
                AddCard(question.Content!, answer, "Quiz Link");
            }
        }

        if (cards.Count == 0)
        {
            AddCard($"Bài \"{title}\" nói về nội dung gì?", "Hiện chưa đủ dữ liệu văn bản để tạo flashcard tự động. Bạn có thể cập nhật DocumentContent cho bài học này.", "Fallback");
        }

        for (var i = 0; i < cards.Count; i++)
        {
            cards[i].Index = i + 1;
        }

        return cards;
    }

    private static string ToPlainText(string? raw)
    {
        if (string.IsNullOrWhiteSpace(raw))
        {
            return string.Empty;
        }

        var noHtml = Regex.Replace(raw, "<[^>]*>", " ");
        var decoded = WebUtility.HtmlDecode(noHtml);
        return Regex.Replace(decoded, @"\s+", " ").Trim();
    }

    private static List<string> SplitSentences(string text)
    {
        if (string.IsNullOrWhiteSpace(text))
        {
            return new List<string>();
        }

        return Regex.Split(text, @"(?<=[\.!\?;:])\s+")
            .Select(item => item.Trim())
            .Where(item => item.Length >= 12)
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .Take(12)
            .ToList();
    }
}
