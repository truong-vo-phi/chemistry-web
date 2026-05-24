using System.Text;
using System.Diagnostics;
using ChemistryV1.Models;
using Google.GenAI;
using Google.GenAI.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace ChemistryV1.Infrastructure;

public interface IAiCourseAssistantService
{
    Task<AiCourseAnswer> AskAsync(int courseId, string question, CancellationToken cancellationToken = default);
}

public class AiCourseAssistantService : IAiCourseAssistantService
{
    private readonly ElearningDbContext _context;
    private readonly AiCourseAssistantOptions _options;

    public AiCourseAssistantService(
        ElearningDbContext context,
        IOptions<AiCourseAssistantOptions> options)
    {
        _context = context;
        _options = options.Value;
    }

    public async Task<AiCourseAnswer> AskAsync(int courseId, string question, CancellationToken cancellationToken = default)
    {
        var normalizedQuestion = await NormalizeQuestionByPythonAsync(question, cancellationToken);

        var course = await _context.Courses
            .Include(c => c.Chapters)
                .ThenInclude(ch => ch.Lessons)
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == courseId, cancellationToken);

        if (course == null)
        {
            return new AiCourseAnswer("Không tìm thấy khóa học này.", Array.Empty<string>());
        }

        var lessonChunks = course.Chapters
            .SelectMany(ch => ch.Lessons.Select(lesson => new LessonChunk(
                lesson.Title,
                lesson.DocumentContent,
                lesson.ContentType)))
            .Where(x => !string.IsNullOrWhiteSpace(x.DocumentContent) || !string.IsNullOrWhiteSpace(x.Title))
            .ToList();

        var topContexts = RetrieveTopContexts(normalizedQuestion, lessonChunks)
            .OrderByDescending(c => c.Score)
            .Take(4)
            .ToList();

        if (!topContexts.Any())
        {
            return new AiCourseAnswer(
                "Mình chưa thấy đủ nội dung bài học để tóm tắt. Bạn có thể mở bài học có tài liệu hoặc thêm nội dung bài giảng trước nhé.",
                Array.Empty<string>());
        }

        var fallback = BuildFallbackAnswer(normalizedQuestion, topContexts);
        if (string.IsNullOrWhiteSpace(ResolveGeminiApiKey()))
        {
            return fallback;
        }

        try
        {
            var externalAnswer = await CallGeminiBySdkAsync(course.Title ?? "Course", normalizedQuestion, topContexts, cancellationToken);
            return new AiCourseAnswer(externalAnswer, topContexts.Select(c => c.Title).ToArray());
        }
        catch
        {
            return fallback;
        }
    }

    private static async Task<string> NormalizeQuestionByPythonAsync(string question, CancellationToken cancellationToken)
    {
        try
        {
            var scriptPath = Path.Combine(AppContext.BaseDirectory, "Scripts", "ai_preprocess.py");
            if (!System.IO.File.Exists(scriptPath))
            {
                return question.Trim();
            }

            var psi = new ProcessStartInfo
            {
                FileName = "python",
                Arguments = $"\"{scriptPath}\"",
                RedirectStandardInput = true,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var process = Process.Start(psi);
            if (process == null)
            {
                return question.Trim();
            }

            await process.StandardInput.WriteAsync(question);
            process.StandardInput.Close();

            var output = await process.StandardOutput.ReadToEndAsync(cancellationToken);
            await process.WaitForExitAsync(cancellationToken);

            var normalized = output.Trim();
            return string.IsNullOrWhiteSpace(normalized) ? question.Trim() : normalized;
        }
        catch
        {
            return question.Trim();
        }
    }

    private async Task<string> CallGeminiBySdkAsync(
        string courseTitle,
        string question,
        List<ContextChunk> contexts,
        CancellationToken cancellationToken)
    {
        var apiKey = ResolveGeminiApiKey();
        if (string.IsNullOrWhiteSpace(apiKey))
        {
            return "Thiếu Gemini API key. Vui lòng cấu hình GEMINI_API_KEY hoặc AiAssistant:ApiKey.";
        }

        var client = new Client(apiKey: apiKey);
        var prompt = BuildPrompt(courseTitle, question, contexts);
        var modelName = string.IsNullOrWhiteSpace(_options.Model) ? "gemini-2.0-flash" : _options.Model!;

        var config = new GenerateContentConfig
        {
            Temperature = 0.2,
            SystemInstruction = new Content
            {
                Parts = new List<Part>
                {
                    new Part
                    {
                        Text = "Bạn là trợ giảng hóa học thân thiện. Trả lời tự nhiên, rõ ràng, bám sát ngữ cảnh bài học; nếu câu hỏi ngoài phạm vi bài học thì nói rõ giới hạn và gợi ý cách hỏi lại. Với công thức toán, lý, hóa: dùng $...$ cho công thức nằm trong cùng dòng văn bản; chỉ dùng $$...$$ khi cần hiển thị riêng một dòng."
                    }
                }
            }
        };

        var response = await client.Models.GenerateContentAsync(
            model: modelName,
            contents: prompt,
            config: config,
            cancellationToken: cancellationToken);

        var text = response.Text;
        if (string.IsNullOrWhiteSpace(text))
        {
            text = response.Candidates?
                .FirstOrDefault()?
                .Content?
                .Parts?
                .FirstOrDefault()?
                .Text;
        }

        return string.IsNullOrWhiteSpace(text)
            ? "Mình chưa nhận được phản hồi phù hợp từ Gemini."
            : text.Trim();
    }

    private string? ResolveGeminiApiKey()
    {
        return System.Environment.GetEnvironmentVariable("GEMINI_API_KEY")
            ?? System.Environment.GetEnvironmentVariable("GOOGLE_API_KEY")
            ?? _options.ApiKey;
    }

    private static string BuildPrompt(string courseTitle, string question, List<ContextChunk> contexts)
    {
        var sb = new StringBuilder();
        sb.AppendLine($"Khóa học: {courseTitle}");
        sb.AppendLine($"Câu hỏi: {question}");
        sb.AppendLine("Ngữ cảnh bài học:");
        foreach (var c in contexts)
        {
            sb.AppendLine($"- {c.Title}: {c.Content}");
        }
        sb.AppendLine("Trả lời bằng tiếng Việt tự nhiên, đi thẳng vào ý chính theo ngữ cảnh. Nếu ngữ cảnh chưa đủ, nêu ngắn gọn phần thiếu và đề xuất 1 câu hỏi tiếp theo.");
        sb.AppendLine("Lưu ý bắt buộc: công thức trong dòng phải đặt trong $...$; chỉ dùng $$...$$ cho công thức cần tách thành một dòng riêng.");
        return sb.ToString();
    }

    private static IEnumerable<ContextChunk> RetrieveTopContexts(string question, List<LessonChunk> lessons)
    {
        var keywords = Tokenize(question);
        foreach (var lesson in lessons)
        {
            var title = lesson.Title ?? "Bài học";
            var content = (lesson.DocumentContent ?? string.Empty).Trim();
            var haystack = $"{title} {content}";
            var score = keywords.Count == 0
                ? 0
                : keywords.Count(k => haystack.Contains(k, StringComparison.OrdinalIgnoreCase));

            if (score > 0 || keywords.Count == 0)
            {
                yield return new ContextChunk(
                    title,
                    content.Length > 420 ? content[..420] + "..." : content,
                    score);
            }
        }
    }

    private static List<string> Tokenize(string text)
    {
        return text
            .Split(new[] { ' ', ',', '.', ';', ':', '?', '!', '\n', '\r', '\t', '-', '_' }, StringSplitOptions.RemoveEmptyEntries)
            .Select(t => t.Trim())
            .Where(t => t.Length >= 3)
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();
    }

    private static AiCourseAnswer BuildFallbackAnswer(string question, List<ContextChunk> contexts)
    {
        var shortPoints = contexts
            .Select((c, idx) => $"{idx + 1}. {c.Title}: {c.Content}")
            .ToList();
        var answer = $"Theo nội dung bài học, đây là phần liên quan nhất tới câu hỏi \"{question}\":\n\n{string.Join("\n\n", shortPoints)}\n\nBạn muốn mình giải thích sâu hơn phần nào?";

        return new AiCourseAnswer(answer, contexts.Select(c => c.Title).ToArray());
    }

    private record LessonChunk(string? Title, string? DocumentContent, string? ContentType);

    private record ContextChunk(string Title, string Content, int Score);
}

public record AiCourseAnswer(string Answer, IReadOnlyList<string> Sources);
