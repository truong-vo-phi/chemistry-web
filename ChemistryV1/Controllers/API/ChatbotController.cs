using ChemistryV1.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace ChemistryV1.Controllers.Api;

[Route("api/chatbot")]
[ApiController]
[AllowAnonymous]
public class ChatbotController : ControllerBase
{
    private readonly ElearningDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly IHttpClientFactory _httpClientFactory;

    public ChatbotController(
        ElearningDbContext context, 
        IConfiguration configuration,
        IHttpClientFactory httpClientFactory)
    {
        _context = context;
        _configuration = configuration;
        _httpClientFactory = httpClientFactory;
    }

    public class ChatMessage
    {
        [JsonPropertyName("role")]
        public string Role { get; set; } = string.Empty; // "user" or "model"

        [JsonPropertyName("text")]
        public string Text { get; set; } = string.Empty;
    }

    public class ChatRequest
    {
        [JsonPropertyName("message")]
        public string Message { get; set; } = string.Empty;

        [JsonPropertyName("history")]
        public List<ChatMessage> History { get; set; } = new();
    }

    [HttpPost("message")]
    public async Task<IActionResult> GetBotResponse([FromBody] ChatRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Message))
        {
            return BadRequest(new { success = false, message = "Tin nhắn không được để trống." });
        }

        var apiKey = _configuration["Gemini:ApiKey"];
        var model = _configuration["Gemini:Model"] ?? "gemini-1.5-flash";

        if (!IsGeminiConfigured(apiKey))
        {
            return Ok(new 
            { 
                success = true, 
                reply = BuildLocalFallbackReply(request.Message)
            });
        }

        try
        {
            // 1. Lấy dữ liệu chương trình học từ DB làm ngữ cảnh (Context)
            var syllabus = new List<CourseContext>();
            try
            {
                syllabus = await _context.Courses
                    .Include(c => c.Chapters)
                    .ThenInclude(ch => ch.Lessons)
                    .Select(c => new CourseContext
                    {
                        Title = c.Title ?? string.Empty,
                        Chapters = c.Chapters.Select(ch => new ChapterContext
                        {
                            Title = ch.Title ?? string.Empty,
                            Lessons = ch.Lessons.Select(l => new LessonContext { Title = l.Title ?? string.Empty }).ToList()
                        }).ToList()
                    })
                    .ToListAsync();
            }
            catch
            {
                // Chatbot should still answer basic questions even if course context is temporarily unavailable.
            }

            var sbContext = new StringBuilder();
            sbContext.AppendLine("Bạn là trợ lý học tập AI của ChemLab, một cổng game hóa học tương tác 2D/3D cho học sinh lớp 8-9.");
            sbContext.AppendLine("Hãy trả lời bằng tiếng Việt thân thiện, khoa học, tràn đầy năng lượng, rõ ý và dễ hiểu cho lứa tuổi học sinh trung học cơ sở.");
            sbContext.AppendLine("Luôn trả lời đầy đủ ý, có mở bài/ngữ cảnh ngắn, các bước giải thích chính và kết luận cuối. Không kết thúc giữa câu, giữa danh sách hoặc giữa công thức.");
            sbContext.AppendLine("Nếu câu hỏi dài, hãy ưu tiên cấu trúc Markdown gọn theo từng mục thay vì cắt bớt phần cuối.");
            sbContext.AppendLine("Sử dụng Markdown rõ ràng, dùng bullet points khi cần thiết. Khi dùng công thức toán/hóa, viết bằng LaTeX với cú pháp inline \\(...\\) hoặc block \\[...\\].");
            sbContext.AppendLine("Dưới đây là sơ đồ chương trình học hiện có trên ChemLab. Khi người dùng hỏi về các khóa học hoặc bài học, hãy dùng thông tin này để hướng dẫn họ học đúng bài trên trang web:");
            
            foreach (var course in syllabus)
            {
                sbContext.AppendLine($"- Khóa học: {course.Title}");
                foreach (var chapter in course.Chapters)
                {
                    sbContext.AppendLine($"  + Chương: {chapter.Title}");
                    foreach (var lesson in chapter.Lessons)
                    {
                        sbContext.AppendLine($"    * Bài học: {lesson.Title}");
                    }
                }
            }

            // 2. Tạo payload cho Gemini API
            var contents = new List<object>();

            // Nạp lịch sử hội thoại
            foreach (var hist in request.History)
            {
                // Gemini API quy định role là "user" hoặc "model"
                var role = hist.Role.ToLowerInvariant() == "model" ? "model" : "user";
                contents.Add(new
                {
                    role = role,
                    parts = new[] { new { text = hist.Text } }
                });
            }

            // Nạp tin nhắn hiện tại của user
            contents.Add(new
            {
                role = "user",
                parts = new[] { new { text = request.Message } }
            });

            // 3. Gọi Gemini API
            var client = _httpClientFactory.CreateClient();
            client.Timeout = TimeSpan.FromSeconds(25);
            var apiUrl = $"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={apiKey}";

            async Task<(string Reply, string FinishReason)> GenerateReplyAsync(List<object> requestContents)
            {
                var payload = new
                {
                    contents = requestContents,
                    systemInstruction = new
                    {
                        parts = new[] { new { text = sbContext.ToString() } }
                    },
                    generationConfig = new
                    {
                        maxOutputTokens = 4096,
                        temperature = 0.55,
                        topP = 0.9
                    }
                };

                var jsonPayload = JsonSerializer.Serialize(payload);
                var httpContent = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

                var response = await client.PostAsync(apiUrl, httpContent);
                if (!response.IsSuccessStatusCode)
                {
                    var errorText = await response.Content.ReadAsStringAsync();
                    throw new HttpRequestException(errorText, null, response.StatusCode);
                }

                var responseString = await response.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(responseString);

                var replyBuilder = new StringBuilder();
                var finishReason = "";

                if (doc.RootElement.TryGetProperty("candidates", out var candidates) &&
                    candidates.GetArrayLength() > 0)
                {
                    var candidate = candidates[0];
                    if (candidate.TryGetProperty("finishReason", out var finishReasonElement))
                    {
                        finishReason = finishReasonElement.GetString() ?? "";
                    }

                    if (candidate.TryGetProperty("content", out var content) &&
                        content.TryGetProperty("parts", out var parts))
                    {
                        foreach (var part in parts.EnumerateArray())
                        {
                            if (part.TryGetProperty("text", out var textElement))
                            {
                                replyBuilder.Append(textElement.GetString());
                            }
                        }
                    }
                }

                return (replyBuilder.ToString(), finishReason);
            }

            string reply;
            try
            {
                var result = await GenerateReplyAsync(contents);
                var replyBuilder = new StringBuilder(result.Reply);
                var finishReason = result.FinishReason;

                const int maxContinuationAttempts = 2;
                for (var attempt = 0; attempt < maxContinuationAttempts && finishReason == "MAX_TOKENS"; attempt++)
                {
                    contents.Add(new
                    {
                        role = "model",
                        parts = new[] { new { text = replyBuilder.ToString() } }
                    });
                    contents.Add(new
                    {
                        role = "user",
                        parts = new[]
                        {
                            new
                            {
                                text = "Câu trả lời vừa rồi bị dừng giữa chừng vì giới hạn độ dài. Hãy tiếp tục chính xác từ ý đang dang dở, hoàn tất phần còn thiếu và kết thúc bằng một kết luận ngắn. Không lặp lại toàn bộ từ đầu."
                            }
                        }
                    });

                    var continuation = await GenerateReplyAsync(contents);
                    if (string.IsNullOrWhiteSpace(continuation.Reply))
                    {
                        break;
                    }

                    replyBuilder.AppendLine();
                    replyBuilder.AppendLine();
                    replyBuilder.Append(continuation.Reply.TrimStart());
                    finishReason = continuation.FinishReason;
                }

                reply = replyBuilder.ToString();
            }
            catch (HttpRequestException ex) when (ex.StatusCode.HasValue)
            {
                return Ok(new
                {
                    success = true,
                    reply = BuildLocalFallbackReply(request.Message)
                });
            }
            catch (TaskCanceledException)
            {
                return Ok(new
                {
                    success = true,
                    reply = BuildLocalFallbackReply(request.Message)
                });
            }

            if (string.IsNullOrWhiteSpace(reply))
            {
                reply = "Xin lỗi, tôi không thể xử lý câu trả lời lúc này.";
            }

            return Ok(new { success = true, reply = reply });
        }
        catch
        {
            return Ok(new
            {
                success = true,
                reply = BuildLocalFallbackReply(request.Message)
            });
        }
    }

    private static bool IsGeminiConfigured(string? apiKey)
    {
        return !string.IsNullOrWhiteSpace(apiKey) &&
            apiKey != "YOUR_GEMINI_API_KEY_HERE";
    }

    private static string BuildLocalFallbackReply(string message)
    {
        var normalized = message.Trim().ToLowerInvariant();
        var isGreeting = normalized is "xin chào" or "chào" or "hello" or "hi" or "hey";

        if (isGreeting)
        {
            return """
            **Xin chào!** Mình là trợ lý học tập của **ChemLab**. 🧪

            Hiện tại mình chưa gọi được dịch vụ AI nâng cao, nhưng mình vẫn có thể hỗ trợ bạn theo hướng cơ bản:

            - Giải thích nhanh khái niệm hóa học lớp 8-9
            - Gợi ý cách học bài hoặc ôn tập
            - Hướng dẫn bạn tìm khóa học/bài học trên ChemLab

            Bạn muốn hỏi về nội dung hóa học nào trước?
            """;
        }

        return """
        Mình đã nhận được câu hỏi của bạn, nhưng hiện tại dịch vụ AI nâng cao chưa sẵn sàng.

        Bạn có thể thử:

        - Gửi lại câu hỏi ngắn hơn
        - Hỏi theo dạng: **"Giải thích..."**, **"Tóm tắt..."**, hoặc **"Cho ví dụ..."**
        - Kiểm tra lại cấu hình Gemini API nếu bạn là quản trị viên

        Mình vẫn ở đây để tiếp tục hỗ trợ khi dịch vụ sẵn sàng. 🧪
        """;
    }

    private class CourseContext
    {
        public string Title { get; set; } = string.Empty;
        public List<ChapterContext> Chapters { get; set; } = new();
    }

    private class ChapterContext
    {
        public string Title { get; set; } = string.Empty;
        public List<LessonContext> Lessons { get; set; } = new();
    }

    private class LessonContext
    {
        public string Title { get; set; } = string.Empty;
    }
}
