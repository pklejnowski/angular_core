using System.Threading.Tasks;

namespace Insig.Common.CQRS;

public interface ICommandDispatcher
{
    Task Dispatch<TCommand>(TCommand command) where TCommand : ICommand;
}