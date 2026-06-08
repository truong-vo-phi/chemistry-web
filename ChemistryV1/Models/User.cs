using System;
using System.Collections.Generic;

namespace ChemistryV1.Models;

public partial class User
{
    public int Id { get; set; }

    public string? Username { get; set; }

    public string? Password { get; set; }

    public string? FullName { get; set; }

    public string? Email { get; set; }

    public bool? EmailConfirmed { get; set; }

    public string? EmailVerificationCodeHash { get; set; }

    public DateTime? EmailVerificationExpiresAt { get; set; }

    public DateTime? EmailVerifiedAt { get; set; }

    public string? AvatarUrl { get; set; }

    public string? Role { get; set; }

    public int? SchoolId { get; set; }

    public bool? IsActive { get; set; }

    public DateTime? CreatedAt { get; set; }

    public int Xp { get; set; } = 0;

    public int Level { get; set; } = 1;

    public int Streak { get; set; } = 0;

    public int CompletedMissions { get; set; } = 0;

    public int Score { get; set; } = 0;

    public virtual ICollection<GameplayResult> GameplayResults { get; set; } = new List<GameplayResult>();

    public virtual ICollection<Class> Classes { get; set; } = new List<Class>();

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual ICollection<CourseEnrollment> CourseEnrollments { get; set; } = new List<CourseEnrollment>();

    public virtual ICollection<Course> Courses { get; set; } = new List<Course>();

    public virtual ICollection<LessonSubmission> LessonSubmissions { get; set; } = new List<LessonSubmission>();

    public virtual ICollection<News> News { get; set; } = new List<News>();

    public virtual ICollection<QuizResult> QuizResults { get; set; } = new List<QuizResult>();

    public virtual ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual School? School { get; set; }

    public virtual ICollection<UserLessonProgress> UserLessonProgresses { get; set; } = new List<UserLessonProgress>();

    public virtual ICollection<UserMissionProgress> UserMissionProgresses { get; set; } = new List<UserMissionProgress>();

    public virtual ICollection<Class> ClassesNavigation { get; set; } = new List<Class>();
}
