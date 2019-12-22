using System.Threading.Tasks;
using Autofac;
using Insig.Common.CQRS;

namespace Insig.Api.Infrastructure
{
    public class CommandDispatcher : ICommandDispatcher
    {
        private readonly ILifetimeScope _lifetimeScope;

        public CommandDispatcher(ILifetimeScope lifetimeScope)
        {
            _lifetimeScope = lifetimeScope;
        }

        public async Task Dispatch<TCommand>(TCommand command) where TCommand : ICommand
        {
            using (var scope = _lifetimeScope.BeginLifetimeScope())
            {
                var handler = scope.Resolve<ICommandHandler<TCommand>>();
                await handler.Handle(command);
            }
        }
    }
}