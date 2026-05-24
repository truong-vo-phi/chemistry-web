using System.ComponentModel.DataAnnotations;

namespace ChemistryV1.ViewModels;

public class RegisterViewModel
{
    [Required]
    [StringLength(255)]
    [Display(Name = "Họ và Tên")]
    public string? FullName { get; set; }

    [Required]
    [StringLength(100)]
    [Display(Name = "Tên đăng nhập")]
    public string? Username { get; set; }

    [Required]
    [EmailAddress]
    [StringLength(255)]
    public string? Email { get; set; }

    [Required]
    [StringLength(100, MinimumLength = 6)]
    [DataType(DataType.Password)]
    [Display(Name = "Mật khẩu")]
    public string? Password { get; set; }

    [Required]
    [DataType(DataType.Password)]
    [Display(Name = "Xác nhận mật khẩu")]
    [Compare(nameof(Password), ErrorMessage = "Mật khẩu xác nhận không khớp.")]
    public string? ConfirmPassword { get; set; }

    [StringLength(500)]
    public string? AvatarUrl { get; set; }
}