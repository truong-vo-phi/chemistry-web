using System;
using ChemistryV1.Models;
using ChemistryV1.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.IO.Compression;
using System.Text.RegularExpressions;

namespace ChemistryV1.Controllers;

[Authorize(Roles = "Admin")]
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
    public async Task<IActionResult> Details(int id, string? returnUrl = null)
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

        if (!string.IsNullOrWhiteSpace(returnUrl) && Url.IsLocalUrl(returnUrl))
        {
            ViewData["ReturnUrl"] = returnUrl;
        }

        if (lesson.IsPreview != true && !User.IsInRole("Admin"))
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

        // Load completed lessons for current user if authenticated
        if (User.Identity?.IsAuthenticated == true)
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (!string.IsNullOrEmpty(userIdClaim))
            {
                var userId = Convert.ToInt32(userIdClaim);
                viewModel.CompletedLessonIds = await _context.UserLessonProgresses
                    .Where(ulp => ulp.UserId == userId && ulp.IsCompleted == true)
                    .Select(ulp => ulp.LessonId)
                    .ToListAsync();

                var submission = await _context.LessonSubmissions
                    .FirstOrDefaultAsync(s => s.LessonId == lesson.Id && s.StudentId == userId);
                if (submission != null)
                {
                    viewModel.HighestScore = submission.Score;
                }
            }
        }

        return View(viewModel);
    }

    [HttpPost]
    [AllowAnonymous]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> MarkAsComplete(int lessonId)
    {
        var lessonDetailsUrl = Url.Action("Details", new { id = lessonId })!;

        if (User.Identity?.IsAuthenticated != true)
        {
            return RedirectToAction("Login", "Account", new { returnUrl = lessonDetailsUrl });
        }

        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim))
        {
            return RedirectToAction("Login", "Account", new { returnUrl = lessonDetailsUrl });
        }

        var userId = Convert.ToInt32(userIdClaim);

        var lesson = await _context.Lessons
            .Include(l => l.Chapter)
            .FirstOrDefaultAsync(l => l.Id == lessonId);
        if (lesson == null || lesson.ChapterId == null)
        {
            return NotFound();
        }

        if (lesson.IsPreview != true && !User.IsInRole("Admin"))
        {
            var courseId = lesson.Chapter!.CourseId;
            var isEnrolled = await _context.CourseEnrollments.AnyAsync(ce => ce.CourseId == courseId && ce.StudentId == userId);
            if (!isEnrolled)
            {
                TempData["EnrollError"] = "Bạn cần đăng ký tham gia khóa học này để hoàn thành bài học.";
                return RedirectToAction("Details", "Courses", new { id = courseId });
            }
        }

        var progress = await _context.UserLessonProgresses
            .FirstOrDefaultAsync(ulp => ulp.UserId == userId && ulp.LessonId == lessonId);

        if (progress == null)
        {
            progress = new UserLessonProgress
            {
                UserId = userId,
                LessonId = lessonId,
                IsCompleted = true,
                CompletedAt = DateTime.UtcNow
            };
            _context.UserLessonProgresses.Add(progress);
        }
        else
        {
            progress.IsCompleted = true;
            progress.CompletedAt = DateTime.UtcNow;
            _context.UserLessonProgresses.Update(progress);
        }

        await _context.SaveChangesAsync();

        return RedirectToAction("Details", new { id = lessonId });
    }

    public async Task<IActionResult> Create(int chapterId)
    {
        var viewModel = await BuildLessonEditorViewModel(chapterId, null);
        if (viewModel == null)
        {
            return NotFound();
        }

        viewModel.Lesson = new Lesson { ChapterId = chapterId, ContentType = "virtual_lab" };
        return View(viewModel);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    [RequestSizeLimit(2147483648L)]
    [RequestFormLimits(MultipartBodyLengthLimit = 2147483648L)]
    public async Task<IActionResult> Create(LessonEditorViewModel viewModel, IFormFile? videoFile, IFormFile? pdfFile, IFormFile? attachmentFile, IFormFile? gameZipFile)
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

        if (gameZipFile != null)
        {
            try
            {
                var virtualLabId = await SaveGameZipAsync(gameZipFile, viewModel.Lesson.Title ?? "New Virtual Lab");
                if (virtualLabId != null)
                {
                    viewModel.Lesson.VirtualLabId = virtualLabId;
                }
            }
            catch (InvalidDataException ex)
            {
                ModelState.AddModelError(nameof(gameZipFile), ex.Message);
                var fallback = await BuildLessonEditorViewModel(viewModel.Lesson.ChapterId.Value, viewModel.Lesson);
                return View(fallback ?? viewModel);
            }
        }

        viewModel.Lesson.ContentType = "virtual_lab";
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
    [RequestSizeLimit(2147483648L)]
    [RequestFormLimits(MultipartBodyLengthLimit = 2147483648L)]
    public async Task<IActionResult> Edit(int id, LessonEditorViewModel viewModel, IFormFile? videoFile, IFormFile? pdfFile, IFormFile? attachmentFile, IFormFile? gameZipFile)
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
        dbLesson.ContentType = "virtual_lab";
        dbLesson.DocumentContent = viewModel.Lesson.DocumentContent;
        dbLesson.IsPreview = viewModel.Lesson.IsPreview;
        dbLesson.OrderIndex = viewModel.Lesson.OrderIndex;
        dbLesson.CommentsEnabled = viewModel.Lesson.CommentsEnabled;
        dbLesson.VirtualLabId = viewModel.Lesson.VirtualLabId;

        if (gameZipFile != null)
        {
            try
            {
                var virtualLabId = await SaveGameZipAsync(gameZipFile, dbLesson.Title ?? "Updated Virtual Lab");
                if (virtualLabId != null)
                {
                    dbLesson.VirtualLabId = virtualLabId;
                }
            }
            catch (InvalidDataException ex)
            {
                ModelState.AddModelError(nameof(gameZipFile), ex.Message);
                var fallback = await BuildLessonEditorViewModel(viewModel.Lesson.ChapterId.Value, viewModel.Lesson);
                return View(fallback ?? viewModel);
            }
        }

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

    private async Task<int?> SaveGameZipAsync(IFormFile zipFile, string lessonTitle)
    {
        if (zipFile == null || zipFile.Length == 0) return null;
        if (!string.Equals(Path.GetExtension(zipFile.FileName), ".zip", StringComparison.OrdinalIgnoreCase))
        {
            throw new InvalidDataException("File game phải là file .zip.");
        }

        var gamesFolder = Path.Combine(_webHostEnvironment.WebRootPath, "games");
        if (!Directory.Exists(gamesFolder))
        {
            Directory.CreateDirectory(gamesFolder);
        }

        var gameFolderName = Guid.NewGuid().ToString();
        var extractPath = Path.Combine(gamesFolder, gameFolderName);
        Directory.CreateDirectory(extractPath);

        var tempZipPath = Path.Combine(Path.GetTempPath(), $"{gameFolderName}.zip");
        using (var fileStream = new FileStream(tempZipPath, FileMode.Create))
        {
            await zipFile.CopyToAsync(fileStream);
        }

        try
        {
            ExtractZipSafely(tempZipPath, extractPath);
        }
        finally
        {
            if (System.IO.File.Exists(tempZipPath))
            {
                System.IO.File.Delete(tempZipPath);
            }
        }

        var indexFilePath = PrepareUnityWebGlBuild(extractPath);
        var relativePath = Path.GetRelativePath(gamesFolder, indexFilePath).Replace("\\", "/");
        var indexHtmlRelativePath = $"/games/{relativePath}";

        var virtualLab = new VirtualLab
        {
            Title = $"{lessonTitle} - Game",
            Url = indexHtmlRelativePath,
            CreatedAt = DateTime.Now
        };
        _context.VirtualLabs.Add(virtualLab);
        await _context.SaveChangesAsync();

        return virtualLab.Id;
    }

    private static void ExtractZipSafely(string zipPath, string destinationDirectory)
    {
        var destinationRoot = Path.GetFullPath(destinationDirectory);
        using var archive = ZipFile.OpenRead(zipPath);

        foreach (var entry in archive.Entries)
        {
            var destinationPath = Path.GetFullPath(Path.Combine(destinationRoot, entry.FullName));
            if (!destinationPath.StartsWith(destinationRoot + Path.DirectorySeparatorChar, StringComparison.OrdinalIgnoreCase) &&
                !string.Equals(destinationPath, destinationRoot, StringComparison.OrdinalIgnoreCase))
            {
                throw new InvalidDataException("File zip chứa đường dẫn không hợp lệ.");
            }

            if (string.IsNullOrEmpty(entry.Name))
            {
                Directory.CreateDirectory(destinationPath);
                continue;
            }

            Directory.CreateDirectory(Path.GetDirectoryName(destinationPath)!);
            entry.ExtractToFile(destinationPath, true);
        }
    }

    private static string PrepareUnityWebGlBuild(string extractPath)
    {
        var indexFiles = Directory.GetFiles(extractPath, "index.html", SearchOption.AllDirectories);
        if (indexFiles.Length == 0)
        {
            throw new InvalidDataException("File zip phải chứa index.html của Unity WebGL.");
        }

        foreach (var indexFile in indexFiles.OrderBy(path => path.Length))
        {
            var indexDirectory = Path.GetDirectoryName(indexFile)!;
            var buildDirectory = Directory.GetDirectories(indexDirectory)
                .FirstOrDefault(directory => string.Equals(Path.GetFileName(directory), "Build", StringComparison.OrdinalIgnoreCase));

            if (buildDirectory == null)
            {
                continue;
            }

            DecompressUnityBuildFiles(buildDirectory);

            var loaderFile = FindRequiredUnityFile(buildDirectory, "*.loader.js", "loader.js");
            var dataFile = FindRequiredUnityFile(buildDirectory, "*.data", "data");
            var frameworkFile = FindRequiredUnityFile(buildDirectory, "*.framework.js", "framework.js");
            var wasmFile = FindRequiredUnityFile(buildDirectory, "*.wasm", "wasm");

            RewriteUnityIndex(indexFile, Path.GetFileName(buildDirectory), loaderFile, dataFile, frameworkFile, wasmFile);
            return indexFile;
        }

        throw new InvalidDataException("Không tìm thấy thư mục Build hợp lệ cạnh index.html trong file zip.");
    }

    private static string FindRequiredUnityFile(string buildDirectory, string pattern, string label)
    {
        var file = Directory.GetFiles(buildDirectory, pattern, SearchOption.TopDirectoryOnly)
            .OrderBy(path => path.Length)
            .FirstOrDefault();

        if (file == null)
        {
            throw new InvalidDataException($"Thiếu file Unity WebGL trong thư mục Build: {label}.");
        }

        return Path.GetFileName(file);
    }

    private static void DecompressUnityBuildFiles(string buildDirectory)
    {
        foreach (var compressedFile in Directory.GetFiles(buildDirectory, "*.br", SearchOption.TopDirectoryOnly))
        {
            var outputFile = compressedFile[..^3];
            if (System.IO.File.Exists(outputFile))
            {
                continue;
            }

            using var input = System.IO.File.OpenRead(compressedFile);
            using var brotli = new BrotliStream(input, CompressionMode.Decompress);
            using var output = System.IO.File.Create(outputFile);
            brotli.CopyTo(output);
        }

        foreach (var compressedFile in Directory.GetFiles(buildDirectory, "*.gz", SearchOption.TopDirectoryOnly))
        {
            var outputFile = compressedFile[..^3];
            if (System.IO.File.Exists(outputFile))
            {
                continue;
            }

            using var input = System.IO.File.OpenRead(compressedFile);
            using var gzip = new GZipStream(input, CompressionMode.Decompress);
            using var output = System.IO.File.Create(outputFile);
            gzip.CopyTo(output);
        }
    }

    private static void RewriteUnityIndex(string indexFile, string buildDirectoryName, string loaderFile, string dataFile, string frameworkFile, string wasmFile)
    {
        var html = System.IO.File.ReadAllText(indexFile);

        html = Regex.Replace(html, @"var\s+buildUrl\s*=\s*[""'][^""']*[""'];", $"var buildUrl = \"{buildDirectoryName}\";");
        html = Regex.Replace(html, @"var\s+loaderUrl\s*=\s*buildUrl\s*\+\s*[""'][^""']*[""'];", $"var loaderUrl = buildUrl + \"/{loaderFile}\";");
        html = Regex.Replace(html, @"dataUrl\s*:\s*buildUrl\s*\+\s*[""'][^""']*[""']", $"dataUrl: buildUrl + \"/{dataFile}\"");
        html = Regex.Replace(html, @"frameworkUrl\s*:\s*buildUrl\s*\+\s*[""'][^""']*[""']", $"frameworkUrl: buildUrl + \"/{frameworkFile}\"");
        html = Regex.Replace(html, @"codeUrl\s*:\s*buildUrl\s*\+\s*[""'][^""']*[""']", $"codeUrl: buildUrl + \"/{wasmFile}\"");
        html = Regex.Replace(html, @"streamingAssetsUrl\s*:\s*[""']StreamingAssets[""']", "streamingAssetsUrl: \"StreamingAssets\"");

        if (!html.Contains("chemlab-unity-upload-fix", StringComparison.OrdinalIgnoreCase))
        {
            var runtimeCss = """
                <style id="chemlab-unity-upload-fix">
                    html, body {
                        width: 100%;
                        height: 100%;
                        margin: 0;
                        overflow: hidden;
                        background: #020617;
                    }
                    #unity-fullscreen-button {
                        display: none !important;
                    }
                    #unity-container,
                    #unity-container.unity-desktop,
                    #unity-container.unity-mobile {
                        position: absolute !important;
                        inset: 0 !important;
                        left: 0 !important;
                        top: 0 !important;
                        width: 100% !important;
                        height: 100% !important;
                        transform: none !important;
                    }
                    #unity-canvas {
                        width: 100% !important;
                        height: 100% !important;
                        display: block !important;
                        background: #020617 !important;
                    }
                    #unity-footer {
                        pointer-events: none;
                    }
                </style>
                """;

            html = Regex.Replace(html, @"</head>", $"{runtimeCss}\n</head>", RegexOptions.IgnoreCase);
        }

        html = Regex.Replace(
            html,
            @"//\s*config\.devicePixelRatio\s*=\s*1;",
            "config.devicePixelRatio = Math.min(window.devicePixelRatio || 1, 1);");

        System.IO.File.WriteAllText(indexFile, html);
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

    // ----TV2----
    [HttpPost]
    [AllowAnonymous]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> AddComment(int lessonId, int? parentId, string content)
    {
        if (User.Identity?.IsAuthenticated != true)
        {
            return RedirectToAction("Login", "Account", new { returnUrl = Url.Action("Details", "Lessons", new { id = lessonId }) });
        }

        if (string.IsNullOrWhiteSpace(content))
        {
            TempData["CommentError"] = "Nội dung thảo luận không được để trống.";
            return RedirectToAction("Details", new { id = lessonId });
        }

        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim))
        {
            return RedirectToAction("Login", "Account", new { returnUrl = Url.Action("Details", "Lessons", new { id = lessonId }) });
        }

        var comment = new Comment
        {
            LessonId = lessonId,
            ParentId = parentId,
            UserId = Convert.ToInt32(userIdClaim),
            Content = content.Trim(),
            CreatedAt = DateTime.Now
        };

        _context.Comments.Add(comment);
        await _context.SaveChangesAsync();

        return RedirectToAction("Details", new { id = lessonId });
    }

    [HttpPost]
    [AllowAnonymous]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> EditComment(int commentId, string content)
    {
        var comment = await _context.Comments.FindAsync(commentId);
        if (comment == null)
        {
            return NotFound();
        }

        if (User.Identity?.IsAuthenticated != true)
        {
            return RedirectToAction("Login", "Account", new { returnUrl = Url.Action("Details", "Lessons", new { id = comment.LessonId }) });
        }

        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || comment.UserId != Convert.ToInt32(userIdClaim))
        {
            return Forbid();
        }

        if (string.IsNullOrWhiteSpace(content))
        {
            TempData["CommentError"] = "Nội dung thảo luận không được để trống.";
            return RedirectToAction("Details", new { id = comment.LessonId });
        }

        comment.Content = content.Trim();
        await _context.SaveChangesAsync();

        return RedirectToAction("Details", new { id = comment.LessonId });
    }

    [HttpPost]
    [AllowAnonymous]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteComment(int commentId)
    {
        var comment = await _context.Comments
            .Include(c => c.InverseParent)
            .FirstOrDefaultAsync(c => c.Id == commentId);

        if (comment == null)
        {
            return NotFound();
        }

        if (User.Identity?.IsAuthenticated != true)
        {
            return RedirectToAction("Login", "Account", new { returnUrl = Url.Action("Details", "Lessons", new { id = comment.LessonId }) });
        }

        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim))
        {
            return RedirectToAction("Login", "Account", new { returnUrl = Url.Action("Details", "Lessons", new { id = comment.LessonId }) });
        }

        var userId = Convert.ToInt32(userIdClaim);
        var isAuthor = comment.UserId == userId;
        var isTeacherOrAdmin = User.IsInRole("Admin");

        if (!isAuthor && !isTeacherOrAdmin)
        {
            return Forbid();
        }

        // Xóa đệ quy tất cả bình luận con để tránh lỗi Foreign Key Constraint
        await DeleteCommentAndRepliesAsync(comment);
        await _context.SaveChangesAsync();

        return RedirectToAction("Details", new { id = comment.LessonId });
    }

    private async Task DeleteCommentAndRepliesAsync(Comment comment)
    {
        var replies = await _context.Comments
            .Where(c => c.ParentId == comment.Id)
            .ToListAsync();

        foreach (var reply in replies)
        {
            await DeleteCommentAndRepliesAsync(reply);
        }

        _context.Comments.Remove(comment);
    }
    // ----TV2----

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
