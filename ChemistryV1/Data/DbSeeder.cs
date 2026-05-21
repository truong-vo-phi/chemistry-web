using ChemistryV1.Models.Content;

namespace ChemistryV1.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(AppDbContext dbContext)
    {
        if (!dbContext.NewsItems.Any())
        {
            dbContext.NewsItems.AddRange(
                new NewsItem
                {
                    Slug = "mo-cua-lab-2d",
                    Title = "Mo cua phong thi nghiem ao 2D phien ban moi",
                    Summary = "Cap nhat bo dung cu mo phong an toan hon cung huong dan tung buoc cho hoc sinh moi.",
                    PublishedDate = new DateOnly(2026, 5, 20),
                    Url = "/science-news-blog"
                },
                new NewsItem
                {
                    Slug = "tuan-le-hoa-hoc-xanh",
                    Title = "Tuan le Hoa hoc Xanh danh cho hoc sinh THCS",
                    Summary = "Chuoi hoat dong kham pha phan ung than thien voi moi truong va mini game tuong tac.",
                    PublishedDate = new DateOnly(2026, 5, 18),
                    Url = "/community"
                },
                new NewsItem
                {
                    Slug = "bang-tuan-hoan-luyen-thi",
                    Title = "Bang tuan hoan tuong tac co them che do luyen thi",
                    Summary = "Bo sung cau hoi theo cap do va he thong goi y thong minh cho tung nhom nguyen to.",
                    PublishedDate = new DateOnly(2026, 5, 15),
                    Url = "/tools/periodic-table"
                });
        }

        if (!dbContext.FeaturedCourses.Any())
        {
            dbContext.FeaturedCourses.AddRange(
                new FeaturedCourse
                {
                    Slug = "hoa-hoc-co-ban-thi-nghiem-ao",
                    Title = "Hoa Hoc Co Ban Qua Thi Nghiem Ao",
                    Level = "Co ban",
                    Lessons = 18,
                    Url = "/courses",
                    DisplayOrder = 1
                },
                new FeaturedCourse
                {
                    Slug = "oxi-hoa-khu",
                    Title = "Kham Pha Phan Ung Oxi Hoa - Khu",
                    Level = "Trung cap",
                    Lessons = 14,
                    Url = "/learning/pathway",
                    DisplayOrder = 2
                },
                new FeaturedCourse
                {
                    Slug = "bi-mat-bang-tuan-hoan",
                    Title = "Bi Mat Bang Tuan Hoan Theo Nhom Chat",
                    Level = "Nang cao",
                    Lessons = 22,
                    Url = "/periodic-table",
                    DisplayOrder = 3
                });
        }

        await dbContext.SaveChangesAsync();
    }
}
