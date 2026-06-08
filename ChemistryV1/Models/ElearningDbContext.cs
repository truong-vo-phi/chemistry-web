using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ChemistryV1.Models;

public partial class ElearningDbContext : DbContext
{
    public ElearningDbContext()
    {
    }

    public ElearningDbContext(DbContextOptions<ElearningDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Chapter> Chapters { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Class> Classes { get; set; }

    public virtual DbSet<Comment> Comments { get; set; }

    public virtual DbSet<Course> Courses { get; set; }

    public virtual DbSet<CourseCategory> CourseCategories { get; set; }

    public virtual DbSet<CourseEnrollment> CourseEnrollments { get; set; }

    public virtual DbSet<Lesson> Lessons { get; set; }

    public virtual DbSet<VirtualLab> VirtualLabs { get; set; } = null!;

    public virtual DbSet<LessonSubmission> LessonSubmissions { get; set; }

    public virtual DbSet<News> News { get; set; }

    public virtual DbSet<Question> Questions { get; set; }

    public virtual DbSet<QuizDetailedAnswer> QuizDetailedAnswers { get; set; }

    public virtual DbSet<QuizResult> QuizResults { get; set; }

    public virtual DbSet<RefreshToken> RefreshTokens { get; set; }

    public virtual DbSet<Review> Reviews { get; set; }

    public virtual DbSet<Revision> Revisions { get; set; }

    public virtual DbSet<School> Schools { get; set; }

    public virtual DbSet<SystemMission> SystemMissions { get; set; }

    public virtual DbSet<UserMissionProgress> UserMissionProgresses { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<GameplayResult> GameplayResults { get; set; }

    public virtual DbSet<UserLessonProgress> UserLessonProgresses { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer("Name=ConnectionStrings:ElearningDb");
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Chapter>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Chapters__3213E83F70D5FB42");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CourseId).HasColumnName("course_id");
            entity.Property(e => e.OrderIndex).HasColumnName("order_index");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .HasColumnName("title");

            entity.HasOne(d => d.Course).WithMany(p => p.Chapters)
                .HasForeignKey(d => d.CourseId)
                .HasConstraintName("FK_Chapters_Courses");

        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Categories__3213E83F6C7A1D42");

            entity.HasIndex(e => e.Slug, "UQ__Categories__32DD1E4C8A4C9D5D").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.Slug)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("slug");
        });

        modelBuilder.Entity<Class>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Classes__3213E83F9453FEDF");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AcademicYear)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("academic_year");
            entity.Property(e => e.ClassName)
                .HasMaxLength(255)
                .HasColumnName("class_name");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.SchoolId).HasColumnName("school_id");
            entity.Property(e => e.TeacherId).HasColumnName("teacher_id");

            entity.HasOne(d => d.School).WithMany(p => p.Classes)
                .HasForeignKey(d => d.SchoolId)
                .HasConstraintName("FK_Classes_Schools");

            entity.HasOne(d => d.Teacher).WithMany(p => p.Classes)
                .HasForeignKey(d => d.TeacherId)
                .HasConstraintName("FK_Classes_Users");

            entity.HasMany(d => d.Students).WithMany(p => p.ClassesNavigation)
                .UsingEntity<Dictionary<string, object>>(
                    "ClassMember",
                    r => r.HasOne<User>().WithMany()
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_ClassMembers_Users"),
                    l => l.HasOne<Class>().WithMany()
                        .HasForeignKey("ClassId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_ClassMembers_Classes"),
                    j =>
                    {
                        j.HasKey("ClassId", "StudentId").HasName("PK__ClassMem__4F5749EF5D1F6D2E");
                        j.ToTable("ClassMembers");
                        j.IndexerProperty<int>("ClassId").HasColumnName("class_id");
                        j.IndexerProperty<int>("StudentId").HasColumnName("student_id");
                    });
        });

        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Comments__3213E83F953618EC");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Content).HasColumnName("content");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.LessonId).HasColumnName("lesson_id");
            entity.Property(e => e.ParentId).HasColumnName("parent_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.MissionId).HasColumnName("mission_id");
            entity.Property(e => e.IsReported)
                .HasColumnName("is_reported")
                .HasDefaultValue(false);
            entity.Property(e => e.ReportCount)
                .HasColumnName("report_count")
                .HasDefaultValue(0);
            entity.Property(e => e.ReportReason)
                .HasColumnName("report_reason");
            entity.Property(e => e.ReportedAt)
                .HasColumnType("datetime")
                .HasColumnName("reported_at");
            entity.Property(e => e.AdminAction)
                .HasMaxLength(255)
                .HasColumnName("admin_action");
            entity.Property(e => e.AdminActionReason)
                .HasColumnName("admin_action_reason");
            entity.Property(e => e.AdminActionBy)
                .HasColumnName("admin_action_by");
            entity.Property(e => e.ActionTakenAt)
                .HasColumnType("datetime")
                .HasColumnName("action_taken_at");

            entity.HasOne(d => d.Lesson).WithMany(p => p.Comments)
                .HasForeignKey(d => d.LessonId)
                .HasConstraintName("FK_Comments_Lessons");

            entity.HasOne(d => d.Mission).WithMany(p => p.Comments)
                .HasForeignKey(d => d.MissionId)
                .HasConstraintName("FK_Comments_SystemMissions");

            entity.HasOne(d => d.Parent).WithMany(p => p.InverseParent)
                .HasForeignKey(d => d.ParentId)
                .HasConstraintName("FK_Comments_Parent");

            entity.HasOne(d => d.User).WithMany(p => p.Comments)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_Comments_Users");
        });

        modelBuilder.Entity<Course>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Courses__3213E83F9B7447CC");

            entity.HasIndex(e => e.Slug, "UQ__Courses__32DD1E4C7A390565").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Slug)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("slug");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValue("draft")
                .HasColumnName("status");
            entity.Property(e => e.TeacherId).HasColumnName("teacher_id");
            entity.Property(e => e.ThumbnailUrl).HasColumnName("thumbnail_url");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .HasColumnName("title");

            entity.HasOne(d => d.Teacher).WithMany(p => p.Courses)
                .HasForeignKey(d => d.TeacherId)
                .HasConstraintName("FK_Courses_Users");
        });

        modelBuilder.Entity<CourseCategory>(entity =>
        {
            entity.HasKey(e => new { e.CourseId, e.CategoryId }).HasName("PK__CourseCa__4D2C2B7B4E6B5F6A");

            entity.ToTable("CourseCategories");

            entity.Property(e => e.CourseId).HasColumnName("course_id");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");

            entity.HasOne(d => d.Course).WithMany(p => p.CourseCategories)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseCategories_Courses");

            entity.HasOne(d => d.Category).WithMany(p => p.CourseCategories)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseCategories_Categories");
        });

        modelBuilder.Entity<CourseEnrollment>(entity =>
        {
            entity.HasKey(e => new { e.CourseId, e.StudentId }).HasName("PK__CourseEn__3DBDC7C75CEDBEA2");

            entity.Property(e => e.CourseId).HasColumnName("course_id");
            entity.Property(e => e.StudentId).HasColumnName("student_id");
            entity.Property(e => e.EnrolledAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("enrolled_at");

            entity.HasOne(d => d.Course).WithMany(p => p.CourseEnrollments)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseEnrollments_Courses");

            entity.HasOne(d => d.Student).WithMany(p => p.CourseEnrollments)
                .HasForeignKey(d => d.StudentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseEnrollments_Users");
        });

        modelBuilder.Entity<Lesson>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Lessons__3213E83FF831917F");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ChapterId).HasColumnName("chapter_id");
            entity.Property(e => e.ContentType)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("content_type");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.DocumentContent).HasColumnName("document_content");
            entity.Property(e => e.IsPreview)
                .HasDefaultValue(false)
                .HasColumnName("is_preview");
            entity.Property(e => e.CommentsEnabled)
                .HasDefaultValue(true)
                .HasColumnName("comments_enabled");
            entity.Property(e => e.OrderIndex).HasColumnName("order_index");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .HasColumnName("title");
            entity.Property(e => e.VideoUrl).HasColumnName("video_url");
            entity.Property(e => e.PdfPath)
                .HasMaxLength(500)
                .HasColumnName("pdf_path");
            entity.Property(e => e.AttachmentPath)
                .HasMaxLength(500)
                .HasColumnName("attachment_path");

            entity.HasOne(d => d.Chapter).WithMany(p => p.Lessons)
                .HasForeignKey(d => d.ChapterId)
                .HasConstraintName("FK_Lessons_Chapters");

            entity.Property(e => e.VirtualLabId)
                .HasColumnName("virtual_lab_id");
            
            entity.HasOne(d => d.VirtualLab)
                  .WithMany(p => p.Lessons)
                  .HasForeignKey(d => d.VirtualLabId)
                  .OnDelete(DeleteBehavior.SetNull)          
                  .HasConstraintName("FK_Lessons_VirtualLabs");
        });

        modelBuilder.Entity<LessonSubmission>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__LessonSu__3213E83F97CEA58B");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.FileUrl).HasColumnName("file_url");
            entity.Property(e => e.LessonId).HasColumnName("lesson_id");
            entity.Property(e => e.Score).HasColumnName("score");
            entity.Property(e => e.StudentId).HasColumnName("student_id");
            entity.Property(e => e.SubmissionContent).HasColumnName("submission_content");
            entity.Property(e => e.TeacherComment).HasColumnName("teacher_comment");

            entity.HasOne(d => d.Lesson).WithMany(p => p.LessonSubmissions)
                .HasForeignKey(d => d.LessonId)
                .HasConstraintName("FK_LessonSubmissions_Lessons");

            entity.HasOne(d => d.Student).WithMany(p => p.LessonSubmissions)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK_LessonSubmissions_Users");
        });

        modelBuilder.Entity<News>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__News__3213E83F22E97CF4");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AuthorId).HasColumnName("author_id");
            entity.Property(e => e.Content).HasColumnName("content");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Slug)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("slug");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValue("published")
                .HasColumnName("status");
            entity.Property(e => e.ThumbnailUrl).HasColumnName("thumbnail_url");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .HasColumnName("title");

            entity.HasOne(d => d.Author).WithMany(p => p.News)
                .HasForeignKey(d => d.AuthorId)
                .HasConstraintName("FK_News_Users");
        });

        modelBuilder.Entity<Question>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Question__3213E83F8E9E37ED");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Content).HasColumnName("content");
            entity.Property(e => e.CorrectAnswer).HasColumnName("correct_answer");
            entity.Property(e => e.CourseId).HasColumnName("course_id");
            entity.Property(e => e.Options).HasColumnName("options");

            entity.HasOne(d => d.Course).WithMany(p => p.Questions)
                .HasForeignKey(d => d.CourseId)
                .HasConstraintName("FK_Questions_Courses");
        });

        modelBuilder.Entity<QuizDetailedAnswer>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.IsCorrect).HasColumnName("is_correct");
            entity.Property(e => e.QuestionId).HasColumnName("question_id");
            entity.Property(e => e.QuizResultId).HasColumnName("quiz_result_id");
            entity.Property(e => e.SelectedAnswer).HasColumnName("selected_answer");

            entity.HasOne(d => d.Question).WithMany()
                .HasForeignKey(d => d.QuestionId)
                .HasConstraintName("FK_QuizDetailedAnswers_Questions");

            entity.HasOne(d => d.QuizResult).WithMany()
                .HasForeignKey(d => d.QuizResultId)
                .HasConstraintName("FK_QuizDetailedAnswers_QuizResults");
        });

        modelBuilder.Entity<QuizResult>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__QuizResu__3213E83F14D601C3");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CompletedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("completed_at");
            entity.Property(e => e.RevisionId).HasColumnName("revision_id");
            entity.Property(e => e.Score).HasColumnName("score");
            entity.Property(e => e.StudentId).HasColumnName("student_id");
            entity.Property(e => e.TotalCorrect).HasColumnName("total_correct");

            entity.HasOne(d => d.Revision).WithMany(p => p.QuizResults)
                .HasForeignKey(d => d.RevisionId)
                .HasConstraintName("FK_QuizResults_Revisions");

            entity.HasOne(d => d.Student).WithMany(p => p.QuizResults)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK_QuizResults_Users");
        });

        modelBuilder.Entity<RefreshToken>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__RefreshT__3213E83FC0ACB173");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ExpiresAt)
                .HasColumnType("datetime")
                .HasColumnName("expires_at");
            entity.Property(e => e.Token)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("token");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.RefreshTokens)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_RefreshTokens_Users");
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Reviews__3213E83F5D5CE2D7");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Content).HasColumnName("content");
            entity.Property(e => e.CourseId).HasColumnName("course_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Rating).HasColumnName("rating");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Course).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.CourseId)
                .HasConstraintName("FK_Reviews_Courses");

            entity.HasOne(d => d.User).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_Reviews_Users");
        });

        modelBuilder.Entity<Revision>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Revision__3213E83F21E19BFF");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CourseId).HasColumnName("course_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.TimeLimit).HasColumnName("time_limit");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .HasColumnName("title");

            entity.HasOne(d => d.Course).WithMany(p => p.Revisions)
                .HasForeignKey(d => d.CourseId)
                .HasConstraintName("FK_Revisions_Courses");

            entity.HasMany(d => d.Questions).WithMany(p => p.Revisions)
                .UsingEntity<Dictionary<string, object>>(
                    "RevisionQuestion",
                    r => r.HasOne<Question>().WithMany()
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_RevisionQuestions_Questions"),
                    l => l.HasOne<Revision>().WithMany()
                        .HasForeignKey("RevisionId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_RevisionQuestions_Revisions"),
                    j =>
                    {
                        j.HasKey("RevisionId", "QuestionId").HasName("PK__Revision__8156D1518CAD8F80");
                        j.ToTable("RevisionQuestions");
                        j.IndexerProperty<int>("RevisionId").HasColumnName("revision_id");
                        j.IndexerProperty<int>("QuestionId").HasColumnName("question_id");
                    });
        });

        modelBuilder.Entity<School>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Schools__3213E83F5E9E8405");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Address).HasColumnName("address");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<SystemMission>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_SystemMissions");

            entity.ToTable("SystemMissions");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ColorClass)
                .HasMaxLength(50)
                .HasColumnName("color_class");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("created_at");
            entity.Property(e => e.Icon)
                .HasMaxLength(100)
                .HasColumnName("icon");
            entity.Property(e => e.IsActive)
                .HasColumnName("is_active");
            entity.Property(e => e.MetricKey)
                .HasMaxLength(100)
                .HasColumnName("metric_key");
            entity.Property(e => e.RewardText)
                .HasMaxLength(255)
                .HasColumnName("reward_text");
            entity.Property(e => e.SortOrder).HasColumnName("sort_order");
            entity.Property(e => e.TargetValue).HasColumnName("target_value");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .HasColumnName("title");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3213E83F2D6B6E9F");

            entity.HasIndex(e => e.Username, "UQ__Users__F3DBC572952E5D47").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AvatarUrl).HasColumnName("avatar_url");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.EmailConfirmed)
                .HasDefaultValue(false)
                .HasColumnName("email_confirmed");
            entity.Property(e => e.EmailVerificationCodeHash)
                .HasMaxLength(255)
                .HasColumnName("email_verification_code_hash");
            entity.Property(e => e.EmailVerificationExpiresAt)
                .HasColumnType("datetime")
                .HasColumnName("email_verification_expires_at");
            entity.Property(e => e.EmailVerifiedAt)
                .HasColumnType("datetime")
                .HasColumnName("email_verified_at");
            entity.Property(e => e.FullName)
                .HasMaxLength(255)
                .HasColumnName("full_name");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.Role)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("role");
            entity.Property(e => e.SchoolId).HasColumnName("school_id");
            entity.Property(e => e.Username)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("username");

            entity.Property(e => e.Xp)
                .HasDefaultValue(0)
                .HasColumnName("xp");
            entity.Property(e => e.Level)
                .HasDefaultValue(1)
                .HasColumnName("level");
            entity.Property(e => e.Streak)
                .HasDefaultValue(0)
                .HasColumnName("streak");
            entity.Property(e => e.CompletedMissions)
                .HasDefaultValue(0)
                .HasColumnName("completed_missions");
            entity.Property(e => e.Score)
                .HasDefaultValue(0)
                .HasColumnName("score");

            entity.HasOne(d => d.School).WithMany(p => p.Users)
                .HasForeignKey(d => d.SchoolId)
                .HasConstraintName("FK_Users_Schools");
        });

        modelBuilder.Entity<UserMissionProgress>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.MissionId }).HasName("PK_UserMissionProgress");

            entity.ToTable("UserMissionProgress");

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.MissionId).HasColumnName("mission_id");
            entity.Property(e => e.CompletedAt)
                .HasColumnType("datetime")
                .HasColumnName("completed_at");

            entity.HasOne(d => d.User).WithMany(p => p.UserMissionProgresses)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_UserMissionProgress_Users");

            entity.HasOne(d => d.Mission).WithMany(p => p.UserMissionProgresses)
                .HasForeignKey(d => d.MissionId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_UserMissionProgress_SystemMissions");
        });

        modelBuilder.Entity<UserLessonProgress>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.LessonId }).HasName("PK__UserLess__4FFC2874919332CA");

            entity.ToTable("UserLessonProgress");

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.LessonId).HasColumnName("lesson_id");
            entity.Property(e => e.CompletedAt)
                .HasColumnType("datetime")
                .HasColumnName("completed_at");
            entity.Property(e => e.IsCompleted)
                .HasDefaultValue(false)
                .HasColumnName("is_completed");

            entity.HasOne(d => d.Lesson).WithMany(p => p.UserLessonProgresses)
                .HasForeignKey(d => d.LessonId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserLessonProgress_Lessons");

            entity.HasOne(d => d.User).WithMany(p => p.UserLessonProgresses)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserLessonProgress_Users");
        });
        modelBuilder.Entity<VirtualLab>(entity =>
        {
            entity.ToTable("VirtualLabs");   
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title)
                  .IsRequired()
                  .HasMaxLength(255);
            entity.Property(e => e.Url)
                  .IsRequired()
                  .HasMaxLength(500);
            
            entity.Property(e => e.CreatedAt)
                  .HasColumnName("created_at")
                  .HasColumnType("datetime2")
                  .HasDefaultValueSql("GETDATE()");   
        });
        modelBuilder.Entity<GameplayResult>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_GameplayResults");

            entity.ToTable("GameplayResults");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.Score).HasColumnName("score");
            entity.Property(e => e.Xp).HasColumnName("xp");
            entity.Property(e => e.CompletionTime).HasColumnName("completion_time");
            entity.Property(e => e.MissionStatus)
                .HasMaxLength(100)
                .HasColumnName("mission_status");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("created_at");

            entity.HasOne(d => d.User).WithMany(p => p.GameplayResults)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_GameplayResults_Users");
        });
        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
