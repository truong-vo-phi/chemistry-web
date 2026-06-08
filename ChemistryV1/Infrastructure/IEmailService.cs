namespace ChemistryV1.Infrastructure;

public interface IEmailService
{
    Task<EmailSendResult> SendAsync(string toEmail, string subject, string htmlBody, string? textBody = null);
}