using System.ComponentModel.DataAnnotations;

namespace Insig.IdentityServer.Models;

public class ForgotPasswordViewModel
{
    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress]
    public string Email { get; set; }
}