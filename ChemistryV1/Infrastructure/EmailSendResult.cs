namespace ChemistryV1.Infrastructure;

public enum EmailDeliveryMode
{
    Smtp,
    LocalFile
}

public sealed record EmailSendResult(
    EmailDeliveryMode Mode,
    string Message,
    string? LocalFilePath = null)
{
    public bool IsLocalFallback => Mode == EmailDeliveryMode.LocalFile;

    public static EmailSendResult Sent(string recipient, string host)
    {
        return new EmailSendResult(
            EmailDeliveryMode.Smtp,
            "Mã xác nhận đã được gửi. Vui lòng kiểm tra email của bạn.");
    }

    public static EmailSendResult StoredLocally(string recipient, string filePath, string reason)
    {
        return new EmailSendResult(
            EmailDeliveryMode.LocalFile,
            "Mã xác nhận đã được tạo. Vui lòng kiểm tra email của bạn.",
            filePath);
    }
}