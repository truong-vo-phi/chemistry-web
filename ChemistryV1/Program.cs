using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<ChemistryV1.Models.ElearningDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ElearningDb")));

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Account/Login";
        options.LogoutPath = "/Account/Logout";
        options.ExpireTimeSpan = TimeSpan.FromDays(7);
    });

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ChemistryV1.Models.ElearningDbContext>();
    var dbConnection = context.Database.GetDbConnection();
    await dbConnection.OpenAsync();
    using var command = dbConnection.CreateCommand();
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
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
