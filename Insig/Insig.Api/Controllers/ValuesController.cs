using EnsureThat;
using Insig.Common.CQRS;
using Microsoft.AspNetCore.Mvc;
using PublishedLanguage.Dtos;
using PublishedLanguage.Queries;

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
