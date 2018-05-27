using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Insig.Api.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[]
            {
                "Some Data",
                "Example Data",
                "Sample Data"
            };
        }
    }
}
