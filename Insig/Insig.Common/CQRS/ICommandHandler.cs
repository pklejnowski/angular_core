using System.Threading.Tasks;

namespace Insig.Common.CQRS;

public interface ICommandHandler<in TCommand> where TCommand : ICommand
{
    Task Handle(TCommand command);
}