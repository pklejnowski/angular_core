using System;
using System.Linq;
using System.Threading.Tasks;
using Insig.IdentityServer.Infrastructure.Data;
using Insig.IdentityServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;


namespace Insig.IdentityServer.Controllers
{
    [Authorize]
    [Route("[controller]/[action]")]
    public class ManageController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ILogger _logger;

        public ManageController(
          UserManager<AppUser> userManager,
          SignInManager<AppUser> signInManager,
          ILogger<ManageController> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> Index(string returnUrl)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                throw new ApplicationException($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            var model = new IndexViewModel
            {
                Username = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                PhoneNumberConfirmed = user.PhoneNumberConfirmed,
            };

            ViewBag.ReturnUrl = returnUrl;

            return View(model);
        }

        [HttpGet]
        public async Task<IActionResult> ChangePassword(string returnUrl)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                throw new ApplicationException($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            var model = new ChangePasswordViewModel { ReturnUrl = returnUrl };
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ChangePassword(ChangePasswordViewModel model, string button)
        {
            if (button == "cancel")
            {
                return Redirect(!string.IsNullOrEmpty(model.ReturnUrl)
                    ? model.ReturnUrl + $"?resultCode={ResultCode.PasswordCanceled}"
                    : "~/");
            }
            else
            {
                if (!ModelState.IsValid)
                {
                    return View(model);
                }

                var user = await _userManager.GetUserAsync(User);
                if (user == null)
                {
                    throw new ApplicationException($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
                }

                var changePasswordResult = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
                if (!changePasswordResult.Succeeded)
                {
                    _logger.Log(LogLevel.Error, $"An error occurs when User with ID '{user.Id}' was trying to change password. (Error: '${string.Join(",", changePasswordResult.Errors.Select(e => e.Description))}')");
                    model.HasError = true;
                    return View(model);
                }

                await _signInManager.SignInAsync(user, isPersistent: false);

                return Redirect(!string.IsNullOrEmpty(model.ReturnUrl)
                    ? model.ReturnUrl + $"?resultCode={ResultCode.PasswordChanged}"
                    : "~/");
            }
        }

        [HttpGet]
        public async Task<IActionResult> ConfirmPhoneNumber(string returnUrl)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                throw new ApplicationException($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            var model = new ChangePasswordViewModel { ReturnUrl = returnUrl };
            return View(model);
        }
    }
}
