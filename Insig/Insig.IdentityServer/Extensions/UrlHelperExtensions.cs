using Insig.IdentityServer.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace Insig.IdentityServer.Extensions
{
    public static class UrlHelperExtensions
    {
        public static string ResetPasswordCallbackLink(this IUrlHelper urlHelper, string userId, string code, string scheme)
        {
            return urlHelper.Action(
                action: nameof(AccountController.ResetPassword),
                controller: "Account",
                values: new { userId, code },
                protocol: scheme);
        }

        public static string EmailVerificationLink(this IUrlHelper urlHelper, string userId, string code, string redirectUrl, string scheme)
        {
            return urlHelper.Action(
                action: nameof(AccountController.ConfirmEmail),
                controller: "Account",
                values: new { userId, code, redirectUrl },
                protocol: scheme);
        }
    }
}
