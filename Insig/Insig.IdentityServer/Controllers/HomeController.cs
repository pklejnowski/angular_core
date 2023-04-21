using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Insig.IdentityServer.Controllers;

[AllowAnonymous]
public class HomeController : Controller
{
    private readonly IWebHostEnvironment _environment;
    private readonly ILogger<HomeController> _logger;

    public HomeController(IWebHostEnvironment environment, ILogger<HomeController> logger)
    {
        _environment = environment;
        _logger = logger;
    }

    public IActionResult Index()
    {
        if (_environment.IsDevelopment())
        {
            // only show in development
            return View();
        }

        _logger.LogInformation("Homepage is disabled in production. Returning 404.");
        return NotFound();
    }

    public IActionResult Privacy()
    {
        return View();
    }
}