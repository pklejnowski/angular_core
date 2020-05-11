using System.Threading.Tasks;

namespace Insig.Common.CQRS
{
    public interface IQueryDispatcher
    {
        Task<TResult> Dispatch<TResult>(IQuery<TResult> query);
    }
}
