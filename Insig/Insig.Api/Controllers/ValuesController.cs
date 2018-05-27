using System.Collections.Generic;
using System.Linq;
using Insig.Infrastructure.DataModel.Context;
using Microsoft.AspNetCore.Mvc;

namespace Insig.Api.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        private readonly InsigContext _context;

        public ValuesController(InsigContext context)
        {
            _context = context;
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[]
            {
                "Some hardcoded data",
                _context.Samples.FirstOrDefault()?.Name ?? "Missing records in Database!"
            };
        }
    }
}
