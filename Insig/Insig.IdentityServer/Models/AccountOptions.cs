using System;

namespace Insig.IdentityServer.Models;

public class AccountOptions
{
    public static bool AllowRememberLogin = true;
    public static TimeSpan RememberMeLoginDuration = TimeSpan.FromDays(30);

    public static bool AutomaticRedirectAfterSignOut = false;

    public static string InvalidCredentialsErrorMessage = "Invalid username or password";
}