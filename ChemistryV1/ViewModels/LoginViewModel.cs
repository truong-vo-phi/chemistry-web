using System.ComponentModel.DataAnnotations;

namespace ChemistryV1.ViewModels;

public class LoginViewModel
{
    [Required]
    [Display(Name = "Email hoặc Tên đăng nhập")]
    public string? Identity { get; set; }

    [Required]
    [DataType(DataType.Password)]
    [Display(Name = "Mật khẩu")]
    public string? Password { get; set; }

    public string? ReturnUrl { get; set; }

    public bool RememberMe { get; set; } = true;
}