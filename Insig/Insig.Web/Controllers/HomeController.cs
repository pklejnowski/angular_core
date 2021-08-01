using System.Text.Json;
using Insig.Web.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Insig.Web.Controllers
{
    [ApiController]
    [Route("home")]
    public class HomeController : Controller
    {
        private readonly AppConfig _applicationConfig;

        public HomeController(IOptions<AppConfig> applicationUrls)
        {
            _applicationConfig = applicationUrls.Value;
        }

        [HttpGet("app-config")]
        public JavaScriptResult GetAppConfig()
        {
            return new JavaScriptResult("window.appConfig = " + JsonSerializer.Serialize(_applicationConfig));
        }
    }
}
