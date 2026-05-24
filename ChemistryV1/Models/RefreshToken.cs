using System;
using System.Collections.Generic;

namespace ChemistryV1.Models;

public partial class RefreshToken
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public string? Token { get; set; }

    public DateTime? ExpiresAt { get; set; }

    public virtual User? User { get; set; }
}
