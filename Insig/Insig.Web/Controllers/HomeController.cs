using System.Text.Json;
using Insig.Web.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Insig.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : Controller
    {
        private readonly AppUrls _applicationUrls;
        public HomeController(IOptions<AppUrls> applicationUrls)
        {
            _applicationUrls = applicationUrls.Value;
        }
        [HttpGet("ApplicationUrls")]
        public JavaScriptResult ApplicationUrls()
        {
            return new JavaScriptResult("window.appConfig = " + JsonSerializer.Serialize(_applicationUrls));
        }
    }
}
