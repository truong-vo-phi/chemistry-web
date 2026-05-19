using System;
using System.Collections.Generic;

namespace ChemistryV1.Models;

public partial class School
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Address { get; set; }

    public virtual ICollection<Class> Classes { get; set; } = new List<Class>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
