using EnsureThat;
using Insig.Common.CQRS;
using Insig.PublishedLanguage.Dtos;
using Insig.PublishedLanguage.Queries;
using Microsoft.AspNetCore.Mvc;

namespace Insig.Api.Controllers
{
    [Route("values")]
    public class ValuesController : Controller
    {
        private readonly IQueryDispatcher _dispatcher;

        public ValuesController(IQueryDispatcher dispatcher)
        {
            EnsureArg.IsNotNull(dispatcher, nameof(dispatcher));

            _dispatcher = dispatcher;
        }

        [HttpGet]
        public SampleDTO Get(SampleParameter parameter)
        {
            return _dispatcher.Dispatch(parameter);
        }
    }
}
