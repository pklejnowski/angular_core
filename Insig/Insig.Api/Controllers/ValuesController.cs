using System.Collections.Generic;
using EnsureThat;
using Insig.Common.CQRS;
using Insig.PublishedLanguage.Commands;
using Insig.PublishedLanguage.Dtos;
using Insig.PublishedLanguage.Queries;
using Microsoft.AspNetCore.Mvc;

namespace Insig.Api.Controllers
{
    [Route("values")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly IQueryDispatcher _queryDispatcher;
        private readonly ICommandDispatcher _commandDispatcher;

        public ValuesController(IQueryDispatcher queryDispatcher, ICommandDispatcher commandDispatcher)
        {
            EnsureArg.IsNotNull(queryDispatcher, nameof(queryDispatcher));
            EnsureArg.IsNotNull(commandDispatcher, nameof(commandDispatcher));

            _queryDispatcher = queryDispatcher;
            _commandDispatcher = commandDispatcher;
        }

        [HttpGet("sample")]
        public List<SampleDTO> Get([FromQuery] SampleParameter parameter)
        {
            return _queryDispatcher.Dispatch(parameter);
        }

        [HttpPost("sample")]
        public void Add([FromBody]AddSampleCommand command)
        {
            _commandDispatcher.Dispatch(command);
        }
    }
}
