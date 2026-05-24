IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'Categories')
BEGIN
    CREATE TABLE Categories (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description NVARCHAR(MAX) NULL,
        created_at DATETIME DEFAULT GETDATE()
    );
END;

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'CourseCategories')
BEGIN
    CREATE TABLE CourseCategories (
        course_id INT NOT NULL,
        category_id INT NOT NULL,
        PRIMARY KEY (course_id, category_id),
        CONSTRAINT FK_CourseCategories_Courses
            FOREIGN KEY (course_id) REFERENCES Courses(id),
        CONSTRAINT FK_CourseCategories_Categories
            FOREIGN KEY (category_id) REFERENCES Categories(id)
    );
END;
