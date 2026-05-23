using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using ChemistryV1.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<ChemistryV1.Models.ElearningDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ElearningDb")));
builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("Email"));
builder.Services.AddScoped<IEmailService, SmtpEmailService>();

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Account/Login";
        options.LogoutPath = "/Account/Logout";
        options.AccessDeniedPath = "/Account/Login";
        options.Cookie.HttpOnly = true;
        options.Cookie.SameSite = SameSiteMode.Lax;
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        options.SlidingExpiration = true;
        options.ExpireTimeSpan = TimeSpan.FromDays(7);
    });

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ChemistryV1.Models.ElearningDbContext>();
    var dbConnection = context.Database.GetDbConnection();
    await dbConnection.OpenAsync();
    using var command = dbConnection.CreateCommand();
    command.CommandText = @"
        UPDATE Users
        SET role = 'Admin'
        WHERE role = 'Teacher';
    ";
    await command.ExecuteNonQueryAsync();

    // Tự động tạo bảng VirtualLabs và thêm 1 Mock Game mẫu
    command.CommandText = @"
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='VirtualLabs' AND xtype='U')
        BEGIN
            CREATE TABLE VirtualLabs (
                id INT IDENTITY(1,1) PRIMARY KEY,
                title NVARCHAR(255) NOT NULL,
                description NVARCHAR(MAX),
                url NVARCHAR(MAX) NOT NULL,
                created_at DATETIME DEFAULT GETDATE()
            );
            INSERT INTO VirtualLabs (title, description, url) 
            VALUES (N'Thí nghiệm: Chuẩn độ Axit - Bazo', N'Game thực hành ảo mô phỏng', '/mock-games/titration.html');
        END
        IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[Lessons]') AND name = 'virtual_lab_id')
        BEGIN
            ALTER TABLE Lessons ADD virtual_lab_id INT NULL;
            ALTER TABLE Lessons ADD CONSTRAINT FK_Lessons_VirtualLabs FOREIGN KEY (virtual_lab_id) REFERENCES VirtualLabs(id) ON DELETE SET NULL;
        END
        IF COL_LENGTH('Lessons', 'comments_enabled') IS NULL
        BEGIN
            ALTER TABLE Lessons ADD comments_enabled BIT NOT NULL CONSTRAINT DF_Lessons_comments_enabled DEFAULT(1);
        END
        IF COL_LENGTH('Users', 'email_confirmed') IS NULL
        BEGIN
            ALTER TABLE Users ADD email_confirmed BIT NOT NULL CONSTRAINT DF_Users_email_confirmed DEFAULT(0);
        END
        IF COL_LENGTH('Users', 'email_verification_code_hash') IS NULL
        BEGIN
            ALTER TABLE Users ADD email_verification_code_hash NVARCHAR(255) NULL;
        END
        IF COL_LENGTH('Users', 'email_verification_expires_at') IS NULL
        BEGIN
            ALTER TABLE Users ADD email_verification_expires_at DATETIME NULL;
        END
        IF COL_LENGTH('Users', 'email_verified_at') IS NULL
        BEGIN
            ALTER TABLE Users ADD email_verified_at DATETIME NULL;
        END
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='SystemMissions' AND xtype='U')
        BEGIN
            CREATE TABLE SystemMissions (
                id INT IDENTITY(1,1) PRIMARY KEY,
                title NVARCHAR(255) NOT NULL,
                reward_text NVARCHAR(255) NOT NULL,
                metric_key NVARCHAR(100) NOT NULL,
                target_value INT NOT NULL,
                icon NVARCHAR(100) NOT NULL,
                color_class NVARCHAR(50) NOT NULL,
                is_active BIT NOT NULL CONSTRAINT DF_SystemMissions_is_active DEFAULT(1),
                sort_order INT NOT NULL CONSTRAINT DF_SystemMissions_sort_order DEFAULT(0),
                created_at DATETIME NOT NULL CONSTRAINT DF_SystemMissions_created_at DEFAULT(GETDATE())
            );
        END
        IF NOT EXISTS (SELECT 1 FROM SystemMissions)
        BEGIN
            INSERT INTO SystemMissions (title, reward_text, metric_key, target_value, icon, color_class, is_active, sort_order)
            VALUES
                (N'Hoàn thành 3 bài học', N'+150 XP', N'lessons_completed', 3, N'check', N'secondary', 1, 1),
                (N'Làm 5 bài quiz', N'+200 XP', N'quizzes_completed', 5, N'radio_button_unchecked', N'primary', 1, 2),
                (N'Giữ streak 3 ngày', N'+250 XP', N'streak_days', 3, N'local_fire_department', N'tertiary', 1, 3),
                (N'Hoàn thành 2 khóa học', N'+300 XP', N'enrollments_count', 2, N'school', N'secondary', 1, 4);
        END
    ";
    await command.ExecuteNonQueryAsync();
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Account}/{action=Login}/{id?}");

app.Run();
