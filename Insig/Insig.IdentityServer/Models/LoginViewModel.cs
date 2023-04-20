namespace Insig.IdentityServer.Models;

public class LoginViewModel : LoginInputModel
{
    public bool AllowRememberLogin { get; set; } = true;
}