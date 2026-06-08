# Schema Comparison: Current Database vs Old `ElearningDB.Categories.sql`

## 1. Overview
- The old file `ElearningDB.Categories.sql` defines only two tables:
  - `Categories`
  - `CourseCategories`
- The current project database schema extends far beyond those two tables and includes the full e-learning and gamification model.
- The comparison is based on:
  - `Database/ElearningDB.Categories.sql`
  - `Models/ElearningDbContext.cs`
  - `Program.cs` startup SQL schema upgrade logic

## 2. `Categories` table
### Old schema
- `id INT IDENTITY(1,1) PRIMARY KEY`
- `name NVARCHAR(255) NOT NULL`
- `slug VARCHAR(255) UNIQUE NOT NULL`
- `description NVARCHAR(MAX) NULL`
- `created_at DATETIME DEFAULT GETDATE()`

### Current schema
- `id INT` primary key
- `name NVARCHAR(255) NOT NULL`
- `slug NVARCHAR(255) NOT NULL` with `IsUnicode(false)` and unique index
- `description NVARCHAR(MAX) NULL`
- `created_at DATETIME DEFAULT(GETDATE())`

### Notes
- The current schema is functionally equivalent, except `slug` is mapped as `NVARCHAR(255)` with non-Unicode semantics instead of raw `VARCHAR(255)`.
- Unique constraint on `slug` is preserved.

## 3. `CourseCategories` table
### Old schema
- `course_id INT NOT NULL`
- `category_id INT NOT NULL`
- Primary key on `(course_id, category_id)`
- Foreign keys:
  - `FK_CourseCategories_Courses` -> `Courses(id)`
  - `FK_CourseCategories_Categories` -> `Categories(id)`

### Current schema
- Same primary key and columns
- Same foreign keys with identical constraint names
- Delete behavior is configured in EF Core as `ClientSetNull`, but the structural schema remains compatible.

## 4. New tables and columns in the current database
The current database includes many additional tables and schema pieces not present in the old SQL file:

### Added tables
- `Users`
- `Courses`
- `Chapters`
- `Lessons`
- `CourseEnrollments`
- `LessonSubmissions`
- `News`
- `Questions`
- `QuizResults`
- `QuizDetailedAnswers`
- `RefreshTokens`
- `Reviews`
- `RevisionQuestions`
- `Revisions`
- `Schools`
- `Classes`
- `ClassMembers`
- `Comments`
- `SystemMissions`
- `UserMissionProgress`
- `UserLessonProgress`
- `VirtualLabs`
- `GameplayResults`

### Added columns and schema upgrades
From `Program.cs`, the app also ensures these columns / tables exist at runtime:
- `Lessons.virtual_lab_id`
- `Lessons.comments_enabled`
- `Users.email_confirmed`
- `Users.email_verification_code_hash`
- `Users.email_verification_expires_at`
- `Users.email_verified_at`
- `Users.xp`
- `Users.level`
- `Users.streak`
- `Users.completed_missions`
- `Users.score`
- `Comments.mission_id`

## 5. Gamification-specific schema added by startup logic
- `GameplayResults` table with fields: `user_id`, `score`, `xp`, `completion_time`, `mission_status`, `created_at`
- `SystemMissions` table with mission definitions and seed data
- `UserMissionProgress` join table for completed system missions
- `Comments.mission_id` foreign key to `SystemMissions`

## 6. Conclusion
- The old SQL file is a legacy partial schema for category management only.
- The current database schema has been expanded significantly to support the full app domain.
- There is no direct schema conflict in `Categories` / `CourseCategories`; the current schema is compatible and more complete.
- The current project should continue using the runtime schema upgrades in `Program.cs` and the EF model defined in `Models/ElearningDbContext.cs`.

## 7. Recommended next step
- If you want a full physical schema export, generate a `CREATE TABLE` script from the current database or use EF migrations to capture the complete schema.
