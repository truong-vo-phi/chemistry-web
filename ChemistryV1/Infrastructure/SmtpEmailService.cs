using System.Net;
using System.Net.Mail;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Hosting;

namespace ChemistryV1.Infrastructure;

public class SmtpEmailService : IEmailService
{
    private readonly EmailSettings _settings;
    private readonly IHostEnvironment _environment;

    public SmtpEmailService(IOptions<EmailSettings> options, IHostEnvironment environment)
    {
        _settings = options.Value;
        _environment = environment;
    }

    public async Task<EmailSendResult> SendAsync(string toEmail, string subject, string htmlBody, string? textBody = null)
    {
        if (CanUseSmtp(out var smtpUnavailableReason))
        {
            try
            {
                await SendViaSmtpAsync(toEmail, subject, htmlBody, textBody);
                return EmailSendResult.Sent(toEmail, _settings.Host!);
            }
            catch (Exception ex)
            {
                if (_settings.FallbackToLocalOutput)
                {
                    return await WriteLocalEmailAsync(toEmail, subject, htmlBody, textBody, $"SMTP thất bại: {ex.Message}");
                }

                throw new InvalidOperationException("Không thể gửi email qua SMTP.", ex);
            }
        }

        if (_settings.FallbackToLocalOutput)
        {
            return await WriteLocalEmailAsync(toEmail, subject, htmlBody, textBody, smtpUnavailableReason);
        }

        throw new InvalidOperationException($"Cấu hình SMTP chưa hợp lệ: {smtpUnavailableReason}");
    }

    private bool CanUseSmtp(out string reason)
    {
        if (string.IsNullOrWhiteSpace(_settings.Host))
        {
            reason = "thiếu SMTP Host";
            return false;
        }

        if (string.IsNullOrWhiteSpace(_settings.FromAddress))
        {
            reason = "thiếu địa chỉ From";
            return false;
        }

        if (string.IsNullOrWhiteSpace(_settings.Username) || string.IsNullOrWhiteSpace(_settings.Password))
        {
            reason = "thiếu Username/Password SMTP";
            return false;
        }

        reason = string.Empty;
        return true;
    }

    private async Task SendViaSmtpAsync(string toEmail, string subject, string htmlBody, string? textBody)
    {
        using var message = new MailMessage
        {
            From = new MailAddress(_settings.FromAddress!, _settings.FromName ?? "ChemLab"),
            Subject = subject,
            SubjectEncoding = System.Text.Encoding.UTF8,
            HeadersEncoding = System.Text.Encoding.UTF8,
            Body = htmlBody,
            BodyEncoding = System.Text.Encoding.UTF8,
            IsBodyHtml = true
        };

        message.To.Add(toEmail);

        using var client = new SmtpClient(_settings.Host, _settings.Port)
        {
            EnableSsl = _settings.EnableSsl,
            Credentials = new NetworkCredential(_settings.Username!, _settings.Password!)
        };

        await client.SendMailAsync(message);
        Console.WriteLine($"[SmtpEmailService] Sent email to {toEmail} via {_settings.Host}");
    }

    private async Task<EmailSendResult> WriteLocalEmailAsync(string toEmail, string subject, string htmlBody, string? textBody, string reason)
    {
        var outputDir = Path.Combine(_environment.ContentRootPath, string.IsNullOrWhiteSpace(_settings.LocalOutputDirectory)
            ? "EmailOutput"
            : _settings.LocalOutputDirectory);
        Directory.CreateDirectory(outputDir);
        var fileName = $"email-{DateTime.UtcNow:yyyyMMddHHmmssfff}-{Guid.NewGuid()}.html";
        var filePath = Path.Combine(outputDir, fileName);

        var html = $@"
<html>
<body style='font-family: Arial, sans-serif; line-height: 1.6; color: #1b1c17;'>
    <div style='padding: 16px; background: #f5f4ec; border: 1px solid #ddd; border-radius: 12px;'>
        <h3>Local email preview</h3>
        <p><strong>To:</strong> {WebUtility.HtmlEncode(toEmail)}</p>
        <p><strong>Subject:</strong> {WebUtility.HtmlEncode(subject)}</p>
        <p><strong>Reason:</strong> {WebUtility.HtmlEncode(reason)}</p>
    </div>
    <hr />
    <div>{htmlBody}</div>
    {(!string.IsNullOrWhiteSpace(textBody) ? $"<hr /><pre style='white-space: pre-wrap;'>{WebUtility.HtmlEncode(textBody)}</pre>" : string.Empty)}
</body>
</html>";

        await File.WriteAllTextAsync(filePath, html);
        Console.WriteLine($"[SmtpEmailService] Stored email locally at {filePath}");
        return EmailSendResult.StoredLocally(toEmail, filePath, reason);
    }
}