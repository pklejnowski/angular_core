using System;
using System.Linq;
using System.Threading.Tasks;
using Insig.IdentityServer.Infrastructure.Data;
using Insig.IdentityServer.Infrastructure.Services;
using Insig.IdentityServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;


namespace Insig.IdentityServer.Controllers
{
    [Authorize]
    public class ManageController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IPhoneVerificationSender _phoneVerificationSender;
        private readonly ILogger _logger;

        public ManageController(
          UserManager<AppUser> userManager,
          SignInManager<AppUser> signInManager,
          IPhoneVerificationSender phoneVerificationSender,
          ILogger<ManageController> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
            _phoneVerificationSender = phoneVerificationSender;
        }

        [HttpGet]
        public async Task<IActionResult> Index(string returnUrl)
        {
            var user = await GetUser();

            var model = new IndexViewModel
            {
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                PhoneNumberConfirmed = user.PhoneNumberConfirmed,
                ReturnUrl = returnUrl
            };

            ViewBag.ReturnUrl = returnUrl;

            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Index(IndexViewModel model, string button)
        {
            if (button == "cancel")
            {
                return Redirect(string.IsNullOrWhiteSpace(model.ReturnUrl) ? "~/" : model.ReturnUrl);
            }

            if (button == "verify")
            {
                try
                {
                    var verification = await _phoneVerificationSender.SendVeryficationCode(model.PhoneNumber);

                    if (verification.Status == "pending")
                    {
                        return RedirectToAction(nameof(ConfirmPhoneNumber));
                    }

                    ModelState.AddModelError("", $"There was an error sending the verification code: {verification.Status}");
                }
                catch (Exception)
                {
                    ModelState.AddModelError("",
                        "There was an error sending the verification code, please check the phone number is correct and try again");
                }
            }

            await UpdateUserProfile(model);

            return View(model);
        }

        [HttpGet]
        public async Task<IActionResult> ConfirmPhoneNumber()
        {
            var user = await GetUser();
            var model = new ConfirmPhoneNumberViewModel { PhoneNumber = user.PhoneNumber };

            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ConfirmPhoneNumber(ConfirmPhoneNumberViewModel model)
        {
            try
            {
                var verification = await _phoneVerificationSender.VerifyCode(model.PhoneNumber, model.Code);

                if (verification.Status == "approved")
                {
                    var identityUser = await GetUser();
                    identityUser.PhoneNumberConfirmed = true;
                    var updateResult = await _userManager.UpdateAsync(identityUser);

                    if (updateResult.Succeeded)
                    {
                        return RedirectToAction("Index");
                    }
                    else
                    {
                        ModelState.AddModelError("", "There was an error confirming the verification code, please try again");
                    }
                }
                else
                {
                    ModelState.AddModelError("", $"There was an error confirming the verification code: {verification.Status}");
                }
            }
            catch (Exception)
            {
                ModelState.AddModelError("",
                    "There was an error confirming the code, please check the verification code is correct and try again");
            }

            return View(model);
        }

        [HttpGet]
        public IActionResult ChangePassword(string returnUrl)
        {
            var model = new ChangePasswordViewModel { ReturnUrl = returnUrl };
            ViewBag.ReturnUrl = returnUrl;

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

                var user = await GetUser();

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

        private async Task<AppUser> GetUser()
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                throw new ApplicationException($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            return user;
        }

        private async Task UpdateUserProfile(IndexViewModel model)
        {
            var user = await GetUser();
            user.Email = model.Email;

            if (user.PhoneNumber != model.PhoneNumber)
            {
                user.PhoneNumber = model.PhoneNumber;
                user.PhoneNumberConfirmed = false;
                model.PhoneNumberConfirmed = false;
            }

            try
            {
                await _userManager.UpdateAsync(user);
                ViewBag.message = "User data has been updated.";
            }
            catch (Exception)
            {
                ViewBag.message = null;
                ModelState.AddModelError("", "There was an error with saving data, please try again");
            }
        }
    }
}
