using System.Threading.Tasks;

namespace Insig.Domain
{
    public interface IUnitOfWork
    {
        Task Save();
    }
}
