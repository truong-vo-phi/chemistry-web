using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using ChemistryV1.Infrastructure;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.AspNetCore.Http.Features;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 2L * 1024L * 1024L * 1024L;
    options.ValueLengthLimit = int.MaxValue;
    options.MultipartHeadersLengthLimit = int.MaxValue;
});
builder.Services.Configure<IISServerOptions>(options =>
{
    options.MaxRequestBodySize = 2L * 1024L * 1024L * 1024L;
});
builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.MaxRequestBodySize = 2L * 1024L * 1024L * 1024L;
    options.Limits.MinRequestBodyDataRate = null;
    options.Limits.KeepAliveTimeout = TimeSpan.FromMinutes(10);
    options.Limits.RequestHeadersTimeout = TimeSpan.FromMinutes(2);
});
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

        // SỬA DÒNG NÀY THÀNH SameAsRequest:
        options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;

        options.SlidingExpiration = true;
        options.ExpireTimeSpan = TimeSpan.FromDays(7);
    });

var app = builder.Build();

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = Microsoft.AspNetCore.HttpOverrides.ForwardedHeaders.XForwardedFor | Microsoft.AspNetCore.HttpOverrides.ForwardedHeaders.XForwardedProto
});
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ChemistryV1.Models.ElearningDbContext>();
    await context.Database.EnsureCreatedAsync();

    var dbConnection = context.Database.GetDbConnection();
    await dbConnection.OpenAsync();
    using var command = dbConnection.CreateCommand();
    command.CommandText = @"
        IF OBJECT_ID(N'dbo.Users', N'U') IS NOT NULL
        BEGIN
            UPDATE Users
            SET role = 'Admin'
            WHERE role = 'Teacher';
        END
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
        IF OBJECT_ID(N'dbo.Lessons', N'U') IS NOT NULL AND NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[Lessons]') AND name = 'virtual_lab_id')
        BEGIN
            ALTER TABLE Lessons ADD virtual_lab_id INT NULL;
            ALTER TABLE Lessons ADD CONSTRAINT FK_Lessons_VirtualLabs FOREIGN KEY (virtual_lab_id) REFERENCES VirtualLabs(id) ON DELETE SET NULL;
        END
        IF OBJECT_ID(N'dbo.Lessons', N'U') IS NOT NULL AND COL_LENGTH('Lessons', 'comments_enabled') IS NULL
        BEGIN
            ALTER TABLE Lessons ADD comments_enabled BIT NOT NULL CONSTRAINT DF_Lessons_comments_enabled DEFAULT(1);
        END
        IF OBJECT_ID(N'dbo.Users', N'U') IS NOT NULL AND COL_LENGTH('Users', 'email_confirmed') IS NULL
        BEGIN
            ALTER TABLE Users ADD email_confirmed BIT NOT NULL CONSTRAINT DF_Users_email_confirmed DEFAULT(0);
        END
        IF OBJECT_ID(N'dbo.Users', N'U') IS NOT NULL AND COL_LENGTH('Users', 'email_verification_code_hash') IS NULL
        BEGIN
            ALTER TABLE Users ADD email_verification_code_hash NVARCHAR(255) NULL;
        END
        IF OBJECT_ID(N'dbo.Users', N'U') IS NOT NULL AND COL_LENGTH('Users', 'email_verification_expires_at') IS NULL
        BEGIN
            ALTER TABLE Users ADD email_verification_expires_at DATETIME NULL;
        END
        IF OBJECT_ID(N'dbo.Users', N'U') IS NOT NULL AND COL_LENGTH('Users', 'email_verified_at') IS NULL
        BEGIN
            ALTER TABLE Users ADD email_verified_at DATETIME NULL;
        END

        -- Progression columns on Users
        IF OBJECT_ID(N'dbo.Users', N'U') IS NOT NULL AND COL_LENGTH('Users', 'xp') IS NULL
        BEGIN
            ALTER TABLE Users ADD xp INT NOT NULL CONSTRAINT DF_Users_xp DEFAULT(0);
        END
        IF OBJECT_ID(N'dbo.Users', N'U') IS NOT NULL AND COL_LENGTH('Users', 'level') IS NULL
        BEGIN
            ALTER TABLE Users ADD level INT NOT NULL CONSTRAINT DF_Users_level DEFAULT(1);
        END
        IF OBJECT_ID(N'dbo.Users', N'U') IS NOT NULL AND COL_LENGTH('Users', 'streak') IS NULL
        BEGIN
            ALTER TABLE Users ADD streak INT NOT NULL CONSTRAINT DF_Users_streak DEFAULT(0);
        END
        IF OBJECT_ID(N'dbo.Users', N'U') IS NOT NULL AND COL_LENGTH('Users', 'completed_missions') IS NULL
        BEGIN
            ALTER TABLE Users ADD completed_missions INT NOT NULL CONSTRAINT DF_Users_completed_missions DEFAULT(0);
        END
        IF OBJECT_ID(N'dbo.Users', N'U') IS NOT NULL AND COL_LENGTH('Users', 'score') IS NULL
        BEGIN
            ALTER TABLE Users ADD score INT NOT NULL CONSTRAINT DF_Users_score DEFAULT(0);
        END

        -- GameplayResults table
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='GameplayResults' AND xtype='U')
        BEGIN
            CREATE TABLE GameplayResults (
                id INT IDENTITY(1,1) PRIMARY KEY,
                user_id INT NOT NULL,
                score INT NOT NULL,
                xp INT NOT NULL,
                completion_time INT NOT NULL,
                mission_status NVARCHAR(100) NULL,
                created_at DATETIME DEFAULT GETDATE(),
                CONSTRAINT FK_GameplayResults_Users FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
            );
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

        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='UserMissionProgress' AND xtype='U')
        BEGIN
            CREATE TABLE UserMissionProgress (
                user_id INT NOT NULL,
                mission_id INT NOT NULL,
                completed_at DATETIME NOT NULL DEFAULT(GETDATE()),
                CONSTRAINT PK_UserMissionProgress PRIMARY KEY (user_id, mission_id),
                CONSTRAINT FK_UserMissionProgress_Users FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
                CONSTRAINT FK_UserMissionProgress_SystemMissions FOREIGN KEY (mission_id) REFERENCES SystemMissions(id) ON DELETE CASCADE
            );
        END

        -- Add mission_id to Comments table
        IF OBJECT_ID(N'dbo.Comments', N'U') IS NOT NULL AND COL_LENGTH('Comments', 'mission_id') IS NULL
        BEGIN
            ALTER TABLE Comments ADD mission_id INT NULL;
            ALTER TABLE Comments ADD CONSTRAINT FK_Comments_SystemMissions FOREIGN KEY (mission_id) REFERENCES SystemMissions(id) ON DELETE SET NULL;
        END

        -- One-time dynamic sync for Users progression data if empty
        IF COL_LENGTH('Users','xp') IS NOT NULL
        BEGIN
            EXEC sp_executesql N'
                UPDATE Users
                SET xp = ISNULL((SELECT ROUND(SUM(q.score), 0) FROM QuizResults q WHERE q.student_id = Users.id), 0) + 
                         ISNULL((SELECT COUNT(*) FROM UserLessonProgress p WHERE p.user_id = Users.id AND p.is_completed = 1), 0) * 50
                WHERE xp = 0;
            ';
        END

        IF COL_LENGTH('Users','level') IS NOT NULL
        BEGIN
            EXEC sp_executesql N'
                UPDATE Users
                SET level = CASE WHEN xp / 180 + 1 < 1 THEN 1 ELSE xp / 180 + 1 END
                WHERE level = 1 AND xp > 0;
            ';
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


// Configure Static Files for Unity WebGL
var provider = new FileExtensionContentTypeProvider();
provider.Mappings[".data"] = "application/octet-stream";
provider.Mappings[".wasm"] = "application/wasm";
provider.Mappings[".br"] = "application/octet-stream";
provider.Mappings[".gz"] = "application/octet-stream";
provider.Mappings[".unityweb"] = "application/octet-stream";

app.UseStaticFiles(new StaticFileOptions
{
    ContentTypeProvider = provider,
    OnPrepareResponse = ctx =>
    {
        // Add Content-Encoding header for Brotli compressed files so browser decompresses them
        if (ctx.File.Name.EndsWith(".br"))
        {
            ctx.Context.Response.Headers.Append("Content-Encoding", "br");
            ctx.Context.Response.Headers.Append("Vary", "Accept-Encoding");
            
            // Set correct MIME type underneath the compression
            if (ctx.File.Name.EndsWith(".wasm.br"))
            {
                ctx.Context.Response.ContentType = "application/wasm";
            }
            else if (ctx.File.Name.EndsWith(".js.br"))
            {
                ctx.Context.Response.ContentType = "application/javascript";
            }
            else if (ctx.File.Name.EndsWith(".data.br"))
            {
                ctx.Context.Response.ContentType = "application/octet-stream";
            }
        }
        else if (ctx.File.Name.EndsWith(".gz"))
        {
            ctx.Context.Response.Headers.Append("Content-Encoding", "gzip");
            ctx.Context.Response.Headers.Append("Vary", "Accept-Encoding");

            if (ctx.File.Name.EndsWith(".wasm.gz"))
            {
                ctx.Context.Response.ContentType = "application/wasm";
            }
            else if (ctx.File.Name.EndsWith(".js.gz"))
            {
                ctx.Context.Response.ContentType = "application/javascript";
            }
            else if (ctx.File.Name.EndsWith(".data.gz"))
            {
                ctx.Context.Response.ContentType = "application/octet-stream";
            }
        }
    }
});

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Account}/{action=Login}/{id?}");

app.Run();
