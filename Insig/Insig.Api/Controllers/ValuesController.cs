using System.Collections.Generic;
using System.Threading.Tasks;
using EnsureThat;
using Insig.Common.Auth;
using Insig.Common.CQRS;
using Insig.PublishedLanguage.Commands;
using Insig.PublishedLanguage.Dtos;
using Insig.PublishedLanguage.Queries;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize(Policies.Consumer)]
        [HttpGet("samples")]
        public async Task<IActionResult> GetSamples([FromQuery] SampleParameter parameter)
        {
            List<SampleDTO> result = await _queryDispatcher.Dispatch(parameter);
            return Ok(result);
        }

        [Authorize(Policies.Consumer)]
        [HttpPost("samples")]
        public async Task<IActionResult> AddSamples([FromBody] AddSampleCommand command)
        {
            await _commandDispatcher.Dispatch(command);
            return Ok();
        }
    }
}
