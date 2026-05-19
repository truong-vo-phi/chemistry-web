using System.Security.Claims;
using ChemistryV1.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChemistryV1.Controllers;

public class AccountController : Controller
{
    private readonly ElearningDbContext _context;

    public AccountController(ElearningDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Login(string? returnUrl)
    {
        // Auto-seed default accounts if the database is empty of users
        await EnsureUsersSeededAsync();
        await EnsureDatabaseSeededAsync();

        var users = await _context.Users
            .Where(u => u.IsActive == true)
            .OrderBy(u => u.Role)
            .ToListAsync();

        ViewBag.Users = users;
        ViewBag.ReturnUrl = returnUrl;
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(string username, string password, string? returnUrl)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Username == username && u.Password == password && u.IsActive == true);

        if (user == null)
        {
            ModelState.AddModelError("", "Tên đăng nhập hoặc mật khẩu không đúng.");
            var users = await _context.Users.Where(u => u.IsActive == true).OrderBy(u => u.Role).ToListAsync();
            ViewBag.Users = users;
            ViewBag.ReturnUrl = returnUrl;
            return View();
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
    public async Task<IActionResult> QuickLogin(int userId, string? returnUrl)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null || user.IsActive != true)
        {
            return RedirectToAction(nameof(Login));
        }

        await SignInUserAsync(user);

        if (!string.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl))
        {
            return Redirect(returnUrl);
        }
        return RedirectToAction("Index", "Home");
    }

    [HttpGet]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return RedirectToAction("Index", "Home");
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
            // Table doesn't exist, recreate database schema cleanly
            await _context.Database.EnsureDeletedAsync();
            await _context.Database.EnsureCreatedAsync();
        }

        if (!await _context.Users.AnyAsync())
        {
            var seedUsers = new List<User>
            {
                new User
                {
                    Username = "admin",
                    Password = "123",
                    FullName = "Dr. Eleanor Vance",
                    Email = "admin@chemlab3d.com",
                    AvatarUrl = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
                    Role = "Admin",
                    IsActive = true,
                    CreatedAt = DateTime.Now
                },
                new User
                {
                    Username = "teacher",
                    Password = "123",
                    FullName = "Prof. Alexander Sterling",
                    Email = "teacher@chemlab3d.com",
                    AvatarUrl = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop",
                    Role = "Teacher",
                    IsActive = true,
                    CreatedAt = DateTime.Now
                },
                new User
                {
                    Username = "student",
                    Password = "123",
                    FullName = "Alice Liddell",
                    Email = "student@chemlab3d.com",
                    AvatarUrl = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
                    Role = "Student",
                    IsActive = true,
                    CreatedAt = DateTime.Now
                }
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
                var teacher = await _context.Users.FirstOrDefaultAsync(u => u.Role == "Teacher");
                if (teacher != null)
                {
                    var course = new Course
                    {
                        Title = "Hóa học hữu cơ lớp 9 cơ bản",
                        Slug = "hoa-hoc-huu-co-lop-9-co-ban",
                        Description = "Khóa học cung cấp kiến thức nền tảng về hóa học hữu cơ lớp 9 bao gồm khái niệm hydrocarbon, methane, ethylene, axetilen và rượu etylic.",
                        ThumbnailUrl = "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=800&h=450&fit=crop",
                        Status = "published",
                        TeacherId = teacher.Id,
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
                        DocumentContent = "Hợp chất hữu cơ là hợp chất của carbon (trừ CO, CO2, các muối carbonate, carbide, cianua...). Hóa học hữu cơ là ngành hóa học chuyên nghiên cứu về các hợp chất hữu cơ. Hợp chất hữu cơ gồm 2 loại chính: Hydrocarbon (chỉ chứa C và H) và Dẫn xuất hydrocarbon (chứa C, H và nguyên tố khác như O, N, Cl...).",
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
}
