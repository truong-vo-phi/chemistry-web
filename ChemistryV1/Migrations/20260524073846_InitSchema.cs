using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChemistryV1.Migrations
{
    /// <inheritdoc />
    public partial class InitSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    slug = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Icon = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Categories__3213E83F6C7A1D42", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Schools",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    address = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Schools__3213E83F5E9E8405", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "SystemMissions",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    reward_text = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    metric_key = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    target_value = table.Column<int>(type: "int", nullable: false),
                    icon = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    color_class = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    sort_order = table.Column<int>(type: "int", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SystemMissions", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "VirtualLabs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "GETDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VirtualLabs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    username = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    password = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    full_name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    email = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    email_confirmed = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    email_verification_code_hash = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    email_verification_expires_at = table.Column<DateTime>(type: "datetime", nullable: true),
                    email_verified_at = table.Column<DateTime>(type: "datetime", nullable: true),
                    avatar_url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    role = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    school_id = table.Column<int>(type: "int", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: true, defaultValue: true),
                    created_at = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Users__3213E83F2D6B6E9F", x => x.id);
                    table.ForeignKey(
                        name: "FK_Users_Schools",
                        column: x => x.school_id,
                        principalTable: "Schools",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Classes",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    class_name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    school_id = table.Column<int>(type: "int", nullable: true),
                    teacher_id = table.Column<int>(type: "int", nullable: true),
                    academic_year = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Classes__3213E83F9453FEDF", x => x.id);
                    table.ForeignKey(
                        name: "FK_Classes_Schools",
                        column: x => x.school_id,
                        principalTable: "Schools",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Classes_Users",
                        column: x => x.teacher_id,
                        principalTable: "Users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Courses",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    slug = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    thumbnail_url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    teacher_id = table.Column<int>(type: "int", nullable: true),
                    status = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true, defaultValue: "draft"),
                    created_at = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Courses__3213E83F9B7447CC", x => x.id);
                    table.ForeignKey(
                        name: "FK_Courses_Users",
                        column: x => x.teacher_id,
                        principalTable: "Users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "News",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    slug = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    thumbnail_url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    author_id = table.Column<int>(type: "int", nullable: true),
                    status = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true, defaultValue: "published"),
                    created_at = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__News__3213E83F22E97CF4", x => x.id);
                    table.ForeignKey(
                        name: "FK_News_Users",
                        column: x => x.author_id,
                        principalTable: "Users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "RefreshTokens",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_id = table.Column<int>(type: "int", nullable: true),
                    token = table.Column<string>(type: "varchar(500)", unicode: false, maxLength: 500, nullable: true),
                    expires_at = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__RefreshT__3213E83FC0ACB173", x => x.id);
                    table.ForeignKey(
                        name: "FK_RefreshTokens_Users",
                        column: x => x.user_id,
                        principalTable: "Users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "ClassMembers",
                columns: table => new
                {
                    class_id = table.Column<int>(type: "int", nullable: false),
                    student_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__ClassMem__4F5749EF5D1F6D2E", x => new { x.class_id, x.student_id });
                    table.ForeignKey(
                        name: "FK_ClassMembers_Classes",
                        column: x => x.class_id,
                        principalTable: "Classes",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_ClassMembers_Users",
                        column: x => x.student_id,
                        principalTable: "Users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Chapters",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    course_id = table.Column<int>(type: "int", nullable: true),
                    title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    order_index = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Chapters__3213E83F70D5FB42", x => x.id);
                    table.ForeignKey(
                        name: "FK_Chapters_Courses",
                        column: x => x.course_id,
                        principalTable: "Courses",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "CourseCategories",
                columns: table => new
                {
                    course_id = table.Column<int>(type: "int", nullable: false),
                    category_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__CourseCa__4D2C2B7B4E6B5F6A", x => new { x.course_id, x.category_id });
                    table.ForeignKey(
                        name: "FK_CourseCategories_Categories",
                        column: x => x.category_id,
                        principalTable: "Categories",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_CourseCategories_Courses",
                        column: x => x.course_id,
                        principalTable: "Courses",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "CourseEnrollments",
                columns: table => new
                {
                    course_id = table.Column<int>(type: "int", nullable: false),
                    student_id = table.Column<int>(type: "int", nullable: false),
                    enrolled_at = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__CourseEn__3DBDC7C75CEDBEA2", x => new { x.course_id, x.student_id });
                    table.ForeignKey(
                        name: "FK_CourseEnrollments_Courses",
                        column: x => x.course_id,
                        principalTable: "Courses",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_CourseEnrollments_Users",
                        column: x => x.student_id,
                        principalTable: "Users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    course_id = table.Column<int>(type: "int", nullable: true),
                    content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    options = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    correct_answer = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Question__3213E83F8E9E37ED", x => x.id);
                    table.ForeignKey(
                        name: "FK_Questions_Courses",
                        column: x => x.course_id,
                        principalTable: "Courses",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    course_id = table.Column<int>(type: "int", nullable: true),
                    user_id = table.Column<int>(type: "int", nullable: true),
                    content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    rating = table.Column<int>(type: "int", nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Reviews__3213E83F5D5CE2D7", x => x.id);
                    table.ForeignKey(
                        name: "FK_Reviews_Courses",
                        column: x => x.course_id,
                        principalTable: "Courses",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Reviews_Users",
                        column: x => x.user_id,
                        principalTable: "Users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Revisions",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    course_id = table.Column<int>(type: "int", nullable: true),
                    title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    time_limit = table.Column<int>(type: "int", nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Revision__3213E83F21E19BFF", x => x.id);
                    table.ForeignKey(
                        name: "FK_Revisions_Courses",
                        column: x => x.course_id,
                        principalTable: "Courses",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Lessons",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    chapter_id = table.Column<int>(type: "int", nullable: true),
                    title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    content_type = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    video_url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    document_content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    pdf_path = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    attachment_path = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    order_index = table.Column<int>(type: "int", nullable: true),
                    is_preview = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    comments_enabled = table.Column<bool>(type: "bit", nullable: true, defaultValue: true),
                    created_at = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    virtual_lab_id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Lessons__3213E83FF831917F", x => x.id);
                    table.ForeignKey(
                        name: "FK_Lessons_Chapters",
                        column: x => x.chapter_id,
                        principalTable: "Chapters",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Lessons_VirtualLabs",
                        column: x => x.virtual_lab_id,
                        principalTable: "VirtualLabs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "QuizResults",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    revision_id = table.Column<int>(type: "int", nullable: true),
                    student_id = table.Column<int>(type: "int", nullable: true),
                    score = table.Column<double>(type: "float", nullable: true),
                    total_correct = table.Column<int>(type: "int", nullable: true),
                    completed_at = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__QuizResu__3213E83F14D601C3", x => x.id);
                    table.ForeignKey(
                        name: "FK_QuizResults_Revisions",
                        column: x => x.revision_id,
                        principalTable: "Revisions",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_QuizResults_Users",
                        column: x => x.student_id,
                        principalTable: "Users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "RevisionQuestions",
                columns: table => new
                {
                    revision_id = table.Column<int>(type: "int", nullable: false),
                    question_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Revision__8156D1518CAD8F80", x => new { x.revision_id, x.question_id });
                    table.ForeignKey(
                        name: "FK_RevisionQuestions_Questions",
                        column: x => x.question_id,
                        principalTable: "Questions",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_RevisionQuestions_Revisions",
                        column: x => x.revision_id,
                        principalTable: "Revisions",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    lesson_id = table.Column<int>(type: "int", nullable: true),
                    user_id = table.Column<int>(type: "int", nullable: true),
                    parent_id = table.Column<int>(type: "int", nullable: true),
                    content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Comments__3213E83F953618EC", x => x.id);
                    table.ForeignKey(
                        name: "FK_Comments_Lessons",
                        column: x => x.lesson_id,
                        principalTable: "Lessons",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Comments_Parent",
                        column: x => x.parent_id,
                        principalTable: "Comments",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Comments_Users",
                        column: x => x.user_id,
                        principalTable: "Users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "LessonSubmissions",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    lesson_id = table.Column<int>(type: "int", nullable: true),
                    student_id = table.Column<int>(type: "int", nullable: true),
                    submission_content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    file_url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    score = table.Column<double>(type: "float", nullable: true),
                    teacher_comment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__LessonSu__3213E83F97CEA58B", x => x.id);
                    table.ForeignKey(
                        name: "FK_LessonSubmissions_Lessons",
                        column: x => x.lesson_id,
                        principalTable: "Lessons",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_LessonSubmissions_Users",
                        column: x => x.student_id,
                        principalTable: "Users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "UserLessonProgress",
                columns: table => new
                {
                    user_id = table.Column<int>(type: "int", nullable: false),
                    lesson_id = table.Column<int>(type: "int", nullable: false),
                    is_completed = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    completed_at = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__UserLess__4FFC2874919332CA", x => new { x.user_id, x.lesson_id });
                    table.ForeignKey(
                        name: "FK_UserLessonProgress_Lessons",
                        column: x => x.lesson_id,
                        principalTable: "Lessons",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_UserLessonProgress_Users",
                        column: x => x.user_id,
                        principalTable: "Users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "QuizDetailedAnswers",
                columns: table => new
                {
                    quiz_result_id = table.Column<int>(type: "int", nullable: true),
                    question_id = table.Column<int>(type: "int", nullable: true),
                    selected_answer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    is_correct = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "FK_QuizDetailedAnswers_Questions",
                        column: x => x.question_id,
                        principalTable: "Questions",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_QuizDetailedAnswers_QuizResults",
                        column: x => x.quiz_result_id,
                        principalTable: "QuizResults",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "UQ__Categories__32DD1E4C8A4C9D5D",
                table: "Categories",
                column: "slug",
                unique: true,
                filter: "[slug] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Chapters_course_id",
                table: "Chapters",
                column: "course_id");

            migrationBuilder.CreateIndex(
                name: "IX_Classes_school_id",
                table: "Classes",
                column: "school_id");

            migrationBuilder.CreateIndex(
                name: "IX_Classes_teacher_id",
                table: "Classes",
                column: "teacher_id");

            migrationBuilder.CreateIndex(
                name: "IX_ClassMembers_student_id",
                table: "ClassMembers",
                column: "student_id");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_lesson_id",
                table: "Comments",
                column: "lesson_id");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_parent_id",
                table: "Comments",
                column: "parent_id");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_user_id",
                table: "Comments",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_CourseCategories_category_id",
                table: "CourseCategories",
                column: "category_id");

            migrationBuilder.CreateIndex(
                name: "IX_CourseEnrollments_student_id",
                table: "CourseEnrollments",
                column: "student_id");

            migrationBuilder.CreateIndex(
                name: "IX_Courses_teacher_id",
                table: "Courses",
                column: "teacher_id");

            migrationBuilder.CreateIndex(
                name: "UQ__Courses__32DD1E4C7A390565",
                table: "Courses",
                column: "slug",
                unique: true,
                filter: "[slug] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Lessons_chapter_id",
                table: "Lessons",
                column: "chapter_id");

            migrationBuilder.CreateIndex(
                name: "IX_Lessons_virtual_lab_id",
                table: "Lessons",
                column: "virtual_lab_id");

            migrationBuilder.CreateIndex(
                name: "IX_LessonSubmissions_lesson_id",
                table: "LessonSubmissions",
                column: "lesson_id");

            migrationBuilder.CreateIndex(
                name: "IX_LessonSubmissions_student_id",
                table: "LessonSubmissions",
                column: "student_id");

            migrationBuilder.CreateIndex(
                name: "IX_News_author_id",
                table: "News",
                column: "author_id");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_course_id",
                table: "Questions",
                column: "course_id");

            migrationBuilder.CreateIndex(
                name: "IX_QuizDetailedAnswers_question_id",
                table: "QuizDetailedAnswers",
                column: "question_id");

            migrationBuilder.CreateIndex(
                name: "IX_QuizDetailedAnswers_quiz_result_id",
                table: "QuizDetailedAnswers",
                column: "quiz_result_id");

            migrationBuilder.CreateIndex(
                name: "IX_QuizResults_revision_id",
                table: "QuizResults",
                column: "revision_id");

            migrationBuilder.CreateIndex(
                name: "IX_QuizResults_student_id",
                table: "QuizResults",
                column: "student_id");

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_user_id",
                table: "RefreshTokens",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_course_id",
                table: "Reviews",
                column: "course_id");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_user_id",
                table: "Reviews",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_RevisionQuestions_question_id",
                table: "RevisionQuestions",
                column: "question_id");

            migrationBuilder.CreateIndex(
                name: "IX_Revisions_course_id",
                table: "Revisions",
                column: "course_id");

            migrationBuilder.CreateIndex(
                name: "IX_UserLessonProgress_lesson_id",
                table: "UserLessonProgress",
                column: "lesson_id");

            migrationBuilder.CreateIndex(
                name: "IX_Users_school_id",
                table: "Users",
                column: "school_id");

            migrationBuilder.CreateIndex(
                name: "UQ__Users__F3DBC572952E5D47",
                table: "Users",
                column: "username",
                unique: true,
                filter: "[username] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClassMembers");

            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "CourseCategories");

            migrationBuilder.DropTable(
                name: "CourseEnrollments");

            migrationBuilder.DropTable(
                name: "LessonSubmissions");

            migrationBuilder.DropTable(
                name: "News");

            migrationBuilder.DropTable(
                name: "QuizDetailedAnswers");

            migrationBuilder.DropTable(
                name: "RefreshTokens");

            migrationBuilder.DropTable(
                name: "Reviews");

            migrationBuilder.DropTable(
                name: "RevisionQuestions");

            migrationBuilder.DropTable(
                name: "SystemMissions");

            migrationBuilder.DropTable(
                name: "UserLessonProgress");

            migrationBuilder.DropTable(
                name: "Classes");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "QuizResults");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "Lessons");

            migrationBuilder.DropTable(
                name: "Revisions");

            migrationBuilder.DropTable(
                name: "Chapters");

            migrationBuilder.DropTable(
                name: "VirtualLabs");

            migrationBuilder.DropTable(
                name: "Courses");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Schools");
        }
    }
}
