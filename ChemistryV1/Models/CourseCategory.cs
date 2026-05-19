namespace ChemistryV1.Models;

public partial class CourseCategory
{
    public int CourseId { get; set; }

    public int CategoryId { get; set; }

    public virtual Course? Course { get; set; }

    public virtual Category? Category { get; set; }
}
