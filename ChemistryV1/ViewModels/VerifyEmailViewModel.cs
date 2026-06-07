using System.ComponentModel.DataAnnotations;

namespace ChemistryV1.ViewModels;

public class VerifyEmailViewModel
{
    public int UserId { get; set; }

    [Required]
    public string? Email { get; set; }

    public string? MaskedEmail { get; set; }

    public string? ReturnUrl { get; set; }

    [Required(ErrorMessage = "Vui lòng nhập mã xác nhận.")]
    [StringLength(6, MinimumLength = 6, ErrorMessage = "Mã xác nhận phải có đúng 6 chữ số.")]
    [RegularExpression("^[0-9]{6}$", ErrorMessage = "Mã xác nhận chỉ gồm 6 chữ số.")]
    public string? Code { get; set; }

    public int SecondsLeft { get; set; }
}
