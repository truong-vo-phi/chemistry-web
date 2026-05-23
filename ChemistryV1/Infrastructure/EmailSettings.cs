namespace ChemistryV1.Infrastructure;

public class EmailSettings
{
    public string? Host { get; set; }

    public int Port { get; set; } = 587;

    public string? Username { get; set; }

    public string? Password { get; set; }

    public string? FromAddress { get; set; }

    public string? FromName { get; set; }

    public bool EnableSsl { get; set; } = true;

    public bool FallbackToLocalOutput { get; set; } = false;

    public string LocalOutputDirectory { get; set; } = "EmailOutput";
}