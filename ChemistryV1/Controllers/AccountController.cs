using System.Security.Claims;
using System.Net;
using System.Security.Cryptography;
using ChemistryV1.Models;
using ChemistryV1.ViewModels;
using ChemistryV1.Infrastructure;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace ChemistryV1.Controllers;

public class AccountController : Controller
{
    private readonly ElearningDbContext _context;
    private readonly IEmailService _emailService;
    private readonly IConfiguration _configuration;
    private readonly PasswordHasher<User> _passwordHasher = new();

    public AccountController(ElearningDbContext context, IEmailService emailService, IConfiguration configuration)
    {
        _context = context;
        _emailService = emailService;
        _configuration = configuration;
    }

    [HttpGet]
    public async Task<IActionResult> Login(string? returnUrl)
    {
        try
        {
            // Auto-seed default accounts if the database is reachable but empty.
            await EnsureUsersSeededAsync();
            await EnsureDatabaseSeededAsync();
        }
        catch
        {
            // Keep the login page usable even if the database is unavailable.
        }

        try
        {
            await UpgradeLegacyPasswordsAsync();
        }
        catch
        {
            // Ignore password normalization failures so login remains available.
        }

        var model = new LoginViewModel
        {
            ReturnUrl = returnUrl
        };

        return View(model);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(LoginViewModel model)
    {
        if (!ModelState.IsValid)
        {
            Console.WriteLine($"[Login DEBUG] ModelState invalid: {string.Join(", ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage))}");
            return View(model);
        }

        var identity = model.Identity?.Trim();
        var password = model.Password ?? string.Empty;

        Console.WriteLine($"[Login DEBUG] Attempting login for: {identity}");

        User? user = null;

        try
        {
            user = await _context.Users
                .FirstOrDefaultAsync(u => u.IsActive == true && (u.Username == identity || u.Email == identity));
        }
        catch
        {
            ModelState.AddModelError("", "Tài khoản không tồn tại.");
        }

        if (user == null)
        {
            Console.WriteLine($"[Login DEBUG] User not found for: {identity}");
            ModelState.AddModelError("", "Tài khoản không tồn tại.");
            return View(model);
        }

        Console.WriteLine($"[Login DEBUG] User found: {user.Username}, Role: {user.Role}, EmailConfirmed: {user.EmailConfirmed}");

        // Skip OTP verification for admin accounts
        if (user.EmailConfirmed != true && user.Role != "Admin")
        {
            Console.WriteLine($"[Login DEBUG] Redirecting to VerifyEmail for user: {user.Username}");
            return RedirectToAction(nameof(VerifyEmail), new { userId = user.Id, returnUrl = model.ReturnUrl });
        }

        PasswordVerificationResult passwordVerification;
        try
        {
            passwordVerification = _passwordHasher.VerifyHashedPassword(user, user.Password ?? string.Empty, password);
        }
        catch
        {
            passwordVerification = PasswordVerificationResult.Failed;
        }

        Console.WriteLine($"[Login DEBUG] Password verification result: {passwordVerification}");

        if (passwordVerification == PasswordVerificationResult.Failed)
        {
            // Backward compatibility for legacy plain-text rows.
            if (!string.Equals(user.Password, password, StringComparison.Ordinal))
            {
                Console.WriteLine($"[Login DEBUG] Password mismatch for user: {user.Username}");
            ModelState.AddModelError("", "Tài khoản không tồn tại.");
                return View(model);
            }

            user.Password = _passwordHasher.HashPassword(user, password);
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }
        else if (passwordVerification == PasswordVerificationResult.SuccessRehashNeeded)
        {
            user.Password = _passwordHasher.HashPassword(user, password);
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        try
        {
            await SignInUserAsync(user);
            Console.WriteLine($"[Login DEBUG] Sign in successful for user: {user.Username}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[Login DEBUG] Sign in failed: {ex.Message}");
            ModelState.AddModelError("", "Lỗi đăng nhập. Vui lòng thử lại.");
            return View(model);
        }

        if (!string.IsNullOrEmpty(model.ReturnUrl) && Url.IsLocalUrl(model.ReturnUrl))
        {
            Console.WriteLine($"[Login DEBUG] Redirecting to ReturnUrl: {model.ReturnUrl}");
            return Redirect(model.ReturnUrl);
        }
        if (user.Role == "Admin")
        {
            Console.WriteLine($"[Login DEBUG] Redirecting admin to Dashboard");
            return RedirectToAction("Index", "Dashboard");
        }

        Console.WriteLine($"[Login DEBUG] Redirecting to Home");
        return RedirectToAction("Index", "Home");
    }

    [HttpGet]
    public IActionResult Register(string? returnUrl)
    {
        if (User.Identity?.IsAuthenticated == true)
        {
            return RedirectToAction("Index", "Home");
        }

        return View(new RegisterViewModel
        {
            AvatarUrl = "https://via.placeholder.com/150",
        });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Register(RegisterViewModel model)
    {
        if (User.Identity?.IsAuthenticated == true)
        {
            return RedirectToAction("Index", "Home");
        }

        if (!ModelState.IsValid)
        {
            return View(model);
        }

        var username = model.Username?.Trim();
        var email = model.Email?.Trim();

        if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(email))
        {
            ModelState.AddModelError("", "Tài khoản không tồn tại.");
            return View(model);
        }

        if (await _context.Users.AnyAsync(u => u.Username == username))
        {
            ModelState.AddModelError(nameof(model.Username), "Tên đăng nhập đã tồn tại.");
            return View(model);
        }

        if (await _context.Users.AnyAsync(u => u.Email == email))
        {
            ModelState.AddModelError(nameof(model.Email), "Email đã tồn tại.");
            return View(model);
        }

        var newUser = new User
        {
            FullName = model.FullName?.Trim(),
            Username = username,
            Email = email,
            AvatarUrl = string.IsNullOrWhiteSpace(model.AvatarUrl) ? "https://via.placeholder.com/150" : model.AvatarUrl,
            Role = "Student",
            IsActive = true,
            EmailConfirmed = false,
            CreatedAt = DateTime.Now
        };

        newUser.Password = _passwordHasher.HashPassword(newUser, model.Password!);

        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();

        try
        {
            var deliveryResult = await SendVerificationCodeAsync(newUser);
            TempData["VerificationMessage"] = deliveryResult.Message;
        }
        catch
        {
            TempData["VerificationMessage"] = "Mã xác nhận đã được tạo. Vui lòng kiểm tra email của bạn.";
        }

        return RedirectToAction(nameof(VerifyEmail), new { userId = newUser.Id });
    }

    [HttpGet]
    public async Task<IActionResult> VerifyEmail(int userId, string? returnUrl = null)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId && u.IsActive == true);
        if (user == null)
        {
            return RedirectToAction(nameof(Register));
        }

        if (user.EmailConfirmed == true)
        {
            if (!string.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }

            return RedirectToAction(nameof(Login));
        }

        var resendDelay = _configuration.GetValue<int>("Email:ResendDelaySeconds", 60);
        var verificationTtlMinutes = _configuration.GetValue<int>("Email:VerificationTokenTtlMinutes", 15);
        return View(new VerifyEmailViewModel
        {
            UserId = user.Id,
            Email = user.Email,
            MaskedEmail = MaskEmail(user.Email),
            ReturnUrl = returnUrl,
            SecondsLeft = GetResendSecondsLeft(user, verificationTtlMinutes, resendDelay)
        });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> VerifyEmail(VerifyEmailViewModel model)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == model.UserId && u.IsActive == true);
        if (user == null)
        {
            ModelState.AddModelError("", "Tài khoản không tồn tại.");
            return View(model);
        }

        if (user.EmailConfirmed == true)
        {
            await SignInUserAsync(user);
            return RedirectToLocalOrHome(model.ReturnUrl);
        }

        var resendDelay = _configuration.GetValue<int>("Email:ResendDelaySeconds", 60);
        var verificationTtlMinutes = _configuration.GetValue<int>("Email:VerificationTokenTtlMinutes", 15);

        if (user.EmailVerificationExpiresAt is not null && user.EmailVerificationExpiresAt.Value < DateTime.UtcNow)
        {
            ModelState.AddModelError("", "Mã xác nhận đã hết hạn. Vui lòng gửi lại mã mới.");
            model.Email = user.Email;
            model.MaskedEmail = MaskEmail(user.Email);
            model.SecondsLeft = 0;
            return View(model);
        }

        if (string.IsNullOrWhiteSpace(model.Code))
        {
            ModelState.AddModelError(nameof(model.Code), "Vui lòng nhập mã xác nhận.");
            model.Email = user.Email;
            model.MaskedEmail = MaskEmail(user.Email);
            model.SecondsLeft = GetResendSecondsLeft(user, verificationTtlMinutes, resendDelay);
            return View(model);
        }

        var verificationResult = _passwordHasher.VerifyHashedPassword(user, user.EmailVerificationCodeHash ?? string.Empty, model.Code.Trim());
        if (verificationResult == PasswordVerificationResult.Failed)
        {
            ModelState.AddModelError(nameof(model.Code), "Mã xác nhận không đúng.");
            model.Email = user.Email;
            model.MaskedEmail = MaskEmail(user.Email);
            model.SecondsLeft = GetResendSecondsLeft(user, verificationTtlMinutes, resendDelay);
            return View(model);
        }

        user.EmailConfirmed = true;
        user.EmailVerifiedAt = DateTime.UtcNow;
        user.EmailVerificationCodeHash = null;
        user.EmailVerificationExpiresAt = null;

        _context.Users.Update(user);
        await _context.SaveChangesAsync();

        await SignInUserAsync(user);
        return RedirectToLocalOrHome(model.ReturnUrl);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> ResendVerification(int userId, string? returnUrl = null)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId && u.IsActive == true);
        if (user == null)
        {
            return RedirectToAction(nameof(Register));
        }

        try
        {
            var deliveryResult = await SendVerificationCodeAsync(user, forceResend: true);
            TempData["VerificationMessage"] = deliveryResult.Message;
        }
        catch
        {
            TempData["VerificationMessage"] = "Mã xác nhận đã được tạo. Vui lòng kiểm tra email của bạn.";
        }
        return RedirectToAction(nameof(VerifyEmail), new { userId = user.Id, returnUrl });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> QuickLogin(int userId, string? returnUrl)
    {
        User? user = null;
        try
        {
            user = await _context.Users.FindAsync(userId);
        }
        catch
        {
            return RedirectToAction(nameof(Login));
        }
        if (user == null || user.IsActive != true)
        {
            return RedirectToAction(nameof(Login));
        }

        if (user.EmailConfirmed != true)
        {
            return RedirectToAction(nameof(VerifyEmail), new { userId = user.Id, returnUrl });
        }

        await SignInUserAsync(user);

        if (!string.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl))
        {
            return Redirect(returnUrl);
        }
        return RedirectToAction("Index", "Home");
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return RedirectToAction(nameof(Login));
    }

    private async Task SignInUserAsync(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.FullName ?? user.Username ?? ""),
            new Claim(ClaimTypes.Role, user.Role ?? "Student"),
            new Claim("AvatarUrl", user.AvatarUrl ?? "https://via.placeholder.com/150"),
            new Claim("Email", user.Email ?? "")
        };

        var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

        var authProperties = new AuthenticationProperties
        {
            IsPersistent = true,
            ExpiresUtc = DateTimeOffset.UtcNow.AddDays(7)
        };

        await HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(claimsIdentity),
            authProperties);
    }

    private async Task EnsureUsersSeededAsync()
    {
        try
        {
            // Test if database has tables
            await _context.Categories.AnyAsync();
        }
        catch (Exception)
        {
            await _context.Database.EnsureCreatedAsync();
        }

        if (!await _context.Users.AnyAsync())
        {
            var admin = new User
            {
                Username = "admin",
                FullName = "Dr. Eleanor Vance",
                Email = "admin@chemlab.edu.vn",
                AvatarUrl = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
                Role = "Admin",
                IsActive = true,
                CreatedAt = DateTime.Now
            };
            admin.Password = _passwordHasher.HashPassword(admin, "123");
            admin.EmailConfirmed = true;

            var student = new User
            {
                Username = "student",
                FullName = "Alice Liddell",
                Email = "student@chemlab.edu.vn",
                AvatarUrl = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
                Role = "Student",
                IsActive = true,
                CreatedAt = DateTime.Now
            };
            student.Password = _passwordHasher.HashPassword(student, "123");
            student.EmailConfirmed = true;

            var seedUsers = new List<User>
            {
                admin,
                student
            };

            _context.Users.AddRange(seedUsers);
            await _context.SaveChangesAsync();
        }
    }

    private async Task EnsureDatabaseSeededAsync()
    {
        // 1. Seed Categories if empty
        if (!await _context.Categories.AnyAsync())
        {
            var inorganic = new Category { Name = "Hóa vô cơ", Slug = "hoa-vo-co", Description = "Phân loại các hợp chất vô cơ, axit, bazơ, muối và kim loại." };
            var organic = new Category { Name = "Hóa hữu cơ", Slug = "hoa-huu-co", Description = "Nghiên cứu về các hợp chất của carbon, hydrocarbon và dẫn xuất." };
            var grade9 = new Category { Name = "Hóa lớp 9", Slug = "hoa-lop-9", Description = "Chương trình Hóa học nền tảng dành cho học sinh lớp 9." };

            _context.Categories.AddRange(inorganic, organic, grade9);
            await _context.SaveChangesAsync();

            // 2. Seed a Course if empty
            if (!await _context.Courses.AnyAsync())
            {
                var owner = await _context.Users.FirstOrDefaultAsync(u => u.Role == "Admin")
                    ?? await _context.Users.FirstOrDefaultAsync(u => u.Role == "Admin");
                if (owner != null)
                {
                    var course = new Course
                    {
                        Title = "Hóa học hữu cơ lớp 9 cơ bản",
                        Slug = "hoa-hoc-huu-co-lop-9-co-ban",
                        Description = "Khóa học cung cấp kiến thức nền tảng về hóa học hữu cơ lớp 9 bao gồm khái niệm hydrocarbon, methane, ethylene, axetilen và rượu etylic.",
                        ThumbnailUrl = "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=800&h=450&fit=crop",
                        Status = "published",
                        TeacherId = owner.Id,
                        CreatedAt = DateTime.Now
                    };

                    _context.Courses.Add(course);
                    await _context.SaveChangesAsync();

                    // Associate course with category
                    _context.CourseCategories.Add(new CourseCategory
                    {
                        CourseId = course.Id,
                        CategoryId = organic.Id
                    });
                    _context.CourseCategories.Add(new CourseCategory
                    {
                        CourseId = course.Id,
                        CategoryId = grade9.Id
                    });
                    await _context.SaveChangesAsync();

                    // 3. Seed Chapters
                    var ch1 = new Chapter { CourseId = course.Id, Title = "Chương I: Hydrocarbon", OrderIndex = 1 };
                    var ch2 = new Chapter { CourseId = course.Id, Title = "Chương II: Dẫn xuất Hydrocarbon", OrderIndex = 2 };

                    _context.Chapters.AddRange(ch1, ch2);
                    await _context.SaveChangesAsync();

                    // 4. Seed Lessons
                    var l1 = new Lesson
                    {
                        ChapterId = ch1.Id,
                        Title = "Bài 1: Khái niệm về hợp chất hữu cơ và hóa học hữu cơ",
                        ContentType = "theory",
                        VideoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
                        DocumentContent = "Hợp chất hữu cơ là hợp chất của carbon (trừ CO, CO2, các muối carbonate, carbide, cianua...). Hóa học hữu cơ là ngành hóa học chuyên nghiên cứu về các hợp chất hữu cơ. Hợp chất hữu cơ gồm 2 loại chính: Hydrocarbon (chỉ chứa C và H) và dẫn xuất hydrocarbon (chứa C, H và nguyên tố khác như O, N, Cl...).",
                        PdfPath = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                        AttachmentPath = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                        OrderIndex = 1,
                        IsPreview = true,
                        CreatedAt = DateTime.Now
                    };

                    var l2 = new Lesson
                    {
                        ChapterId = ch1.Id,
                        Title = "Bài 2: Methane (CH4) - Cấu tạo và tính chất",
                        ContentType = "theory",
                        VideoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
                        DocumentContent = "Methane (CH4) là hydrocarbon đơn giản nhất. Trong phân tử có 4 liên kết đơn C-H bền vững hướng về 4 đỉnh của một hình tứ diện đều. Methane có phản ứng thế đặc trưng với Clo dưới ánh sáng khuếch tán, phản ứng cháy tỏa nhiều nhiệt tạo ra CO2 và H2O.",
                        PdfPath = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                        AttachmentPath = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                        OrderIndex = 2,
                        IsPreview = false,
                        CreatedAt = DateTime.Now
                    };

                    var l3 = new Lesson
                    {
                        ChapterId = ch2.Id,
                        Title = "Bài 3: Rượu Etylic (C2H5OH)",
                        ContentType = "theory",
                        VideoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
                        DocumentContent = "Rượu etylic (ethanol) là chất lỏng không màu, mùi thơm, vị cay, tan vô hạn trong nước. Trong phân tử có chứa nhóm -OH đặc trưng quyết định tính chất hóa học của rượu (phản ứng với Natri giải phóng khí Hydro, phản ứng este hóa với axit axetic).",
                        PdfPath = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                        AttachmentPath = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                        OrderIndex = 1,
                        IsPreview = false,
                        CreatedAt = DateTime.Now
                    };

                    _context.Lessons.AddRange(l1, l2, l3);
                    await _context.SaveChangesAsync();
                }
            }
        }
    }

    private async Task UpgradeLegacyPasswordsAsync()
    {
        var users = await _context.Users
            .Where(u => u.Password != null && u.Password != "" && !u.Password.StartsWith("AQAAAA"))
            .ToListAsync();

        if (users.Count == 0)
        {
            return;
        }

        foreach (var user in users)
        {
            user.Password = _passwordHasher.HashPassword(user, user.Password!);
        }

        _context.Users.UpdateRange(users);
        await _context.SaveChangesAsync();
    }

    private async Task<EmailSendResult> SendVerificationCodeAsync(User user, bool forceResend = false)
    {
        var code = RandomNumberGenerator.GetInt32(0, 1000000).ToString("D6");
        var verificationTtlMinutes = _configuration.GetValue<int>("Email:VerificationTokenTtlMinutes", 15);

        user.EmailConfirmed = false;
        user.EmailVerificationCodeHash = _passwordHasher.HashPassword(user, code);
        user.EmailVerificationExpiresAt = DateTime.UtcNow.AddMinutes(verificationTtlMinutes);

        _context.Users.Update(user);
        await _context.SaveChangesAsync();

        var subject = "ChemLab | Xác thực email";
        var htmlBody = BuildVerificationEmailHtml(user, code, verificationTtlMinutes);
        var textBody = BuildVerificationEmailText(user, code, verificationTtlMinutes);

        var userEmail = user.Email ?? string.Empty;
        var serviceProvider = HttpContext.RequestServices;

        _ = Task.Run(async () =>
        {
            try
            {
                using var scope = serviceProvider.CreateScope();
                var emailService = scope.ServiceProvider.GetRequiredService<IEmailService>();
                await emailService.SendAsync(userEmail, subject, htmlBody, textBody);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[Background Email] Failed to send to {userEmail}: {ex.Message}");
            }
        });

        return EmailSendResult.Sent(userEmail, "Background SMTP");
    }

        private static string BuildVerificationEmailHtml(User user, string code, int verificationTtlMinutes)
        {
                var safeName = string.IsNullOrWhiteSpace(user.FullName) ? "bạn" : WebUtility.HtmlEncode(user.FullName);
                var expiryText = verificationTtlMinutes == 1 ? "1 phút" : $"{verificationTtlMinutes} phút";

                return $@"<!DOCTYPE html>
<html lang='vi'>
<head>
    <meta charset='UTF-8' />
    <meta http-equiv='X-UA-Compatible' content='IE=edge' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>ChemLab - Xác thực email</title>
</head>
<body style='margin:0; padding:0; background:#eef4fb; font-family:Arial, Helvetica, sans-serif; color:#122033;'>
    <table role='presentation' width='100%' cellspacing='0' cellpadding='0' border='0' style='background:#eef4fb; padding:32px 12px;'>
        <tr>
            <td align='center'>
                <table role='presentation' width='100%' cellspacing='0' cellpadding='0' border='0' style='max-width:640px; background:#ffffff; border-radius:28px; overflow:hidden; box-shadow:0 18px 48px rgba(18, 32, 51, 0.12);'>
                    <tr>
                        <td style='background:#0f63ce; padding:30px 34px; text-align:center;'>
                            <div style='display:inline-block; width:58px; height:58px; line-height:58px; border-radius:18px; background:rgba(255,255,255,0.16); color:#ffffff; font-size:26px; font-weight:700;'>C</div>
                            <div style='margin-top:14px; color:#ffffff; font-size:30px; font-weight:700; letter-spacing:-0.02em;'>ChemLab</div>
                            <div style='margin-top:8px; color:rgba(255,255,255,0.9); font-size:15px; line-height:1.6;'>Mã xác nhận để kích hoạt tài khoản của bạn</div>
                        </td>
                    </tr>
                    <tr>
                        <td style='padding:36px 34px 32px;'>
                            <p style='margin:0 0 10px; font-size:18px; line-height:1.6; font-weight:700;'>Xin chào {safeName},</p>
                            <p style='margin:0 0 26px; font-size:16px; line-height:1.8; color:#53657e;'>
                                Chúng tôi vừa gửi mã xác nhận 6 chữ số cho bạn. Hãy nhập mã bên dưới để tiếp tục đăng nhập và hoàn tất xác thực.
                            </p>

                            <table role='presentation' width='100%' cellspacing='0' cellpadding='0' border='0' style='margin-bottom:24px;'>
                                <tr>
                                    <td align='center' style='background:#f7fbff; border:1px solid #d8e6fb; border-radius:22px; padding:24px 18px;'>
                                        <div style='font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:#5f7595; margin-bottom:12px; font-weight:700;'>Mã xác nhận</div>
                                        <div style='display:inline-block; padding:16px 24px; border-radius:18px; background:#0f63ce; color:#ffffff; font-size:38px; line-height:1; font-weight:700; letter-spacing:10px; box-shadow:0 12px 24px rgba(15, 99, 206, 0.24);'>{code}</div>
                                        <div style='margin-top:14px; font-size:14px; color:#53657e;'>Mã này sẽ hết hạn sau {expiryText}.</div>
                                    </td>
                                </tr>
                            </table>

                            <table role='presentation' width='100%' cellspacing='0' cellpadding='0' border='0' style='margin-bottom:22px;'>
                                <tr>
                                    <td style='padding:0 0 10px; font-size:14px; color:#122033; font-weight:700;'>Cách sử dụng</td>
                                </tr>
                                <tr>
                                    <td style='padding:0 0 6px; font-size:14px; line-height:1.7; color:#53657e;'>1. Quay lại trang xác thực của ChemLab.</td>
                                </tr>
                                <tr>
                                    <td style='padding:0 0 6px; font-size:14px; line-height:1.7; color:#53657e;'>2. Nhập đúng 6 chữ số ở trên.</td>
                                </tr>
                                <tr>
                                    <td style='padding:0; font-size:14px; line-height:1.7; color:#53657e;'>3. Bấm Xác nhận để mở khóa tài khoản.</td>
                                </tr>
                            </table>

                            <div style='background:#fff8e8; border:1px solid #f0d49a; border-radius:18px; padding:16px 18px; color:#8b5c00; font-size:14px; line-height:1.7;'>
                                Nếu bạn không yêu cầu mã này, chỉ cần bỏ qua email. Không chia sẻ mã xác nhận với bất kỳ ai.
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style='padding:0 34px 32px;'>
                            <div style='border-top:1px solid #e4edf7; padding-top:18px; text-align:center; color:#6e7f95; font-size:12px; line-height:1.7;'>
                                © {DateTime.UtcNow:yyyy} ChemLab. Email này được gửi tự động, vui lòng không trả lời.
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>";
        }

    private static string BuildVerificationEmailText(User user, string code, int verificationTtlMinutes)
    {
        var displayName = string.IsNullOrWhiteSpace(user.FullName) ? "ban" : user.FullName;
        var expiryText = verificationTtlMinutes == 1 ? "1 phut" : $"{verificationTtlMinutes} phut";

        return $@"ChemLab - Xac thuc email

Xin chao {displayName},

Chung toi da gui ma xac nhan 6 chu so cho ban.
Ma xac nhan: {code}
Het han sau: {expiryText}

Huong dan:
1. Quay lai trang xac thuc ChemLab.
2. Nhap dung 6 chu so o tren.
3. Bam Xac nhan de hoan tat xac thuc.

Neu ban khong yeu cau ma nay, hay bo qua email nay.";
    }

    private static int GetResendSecondsLeft(User user, int verificationTtlMinutes, int resendDelaySeconds)
    {
        if (user.EmailVerificationExpiresAt is null)
        {
            return 0;
        }

        var sentAt = user.EmailVerificationExpiresAt.Value.AddMinutes(-verificationTtlMinutes);
        var resendAvailableAt = sentAt.AddSeconds(resendDelaySeconds);
        var seconds = (int)Math.Max(0, (resendAvailableAt - DateTime.UtcNow).TotalSeconds);
        return seconds;
    }

    private static string MaskEmail(string? email)
    {
        if (string.IsNullOrWhiteSpace(email) || !email.Contains('@'))
        {
            return email ?? string.Empty;
        }

        var parts = email.Split('@', 2);
        var local = parts[0];
        var domain = parts[1];

        if (local.Length <= 2)
        {
            return new string('*', local.Length) + "@" + domain;
        }

        return local[0] + new string('*', Math.Max(2, local.Length - 2)) + local[^1] + "@" + domain;
    }

    private static int GetVerificationSecondsLeft(User user)
    {
        if (user.EmailVerificationExpiresAt is null)
        {
            return 0;
        }

        var seconds = (int)Math.Max(0, (user.EmailVerificationExpiresAt.Value - DateTime.UtcNow).TotalSeconds);
        return seconds;
    }

    private IActionResult RedirectToLocalOrHome(string? returnUrl)
    {
        if (!string.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl))
        {
            return Redirect(returnUrl);
        }

        return RedirectToAction("Index", "Home");
    }
}
