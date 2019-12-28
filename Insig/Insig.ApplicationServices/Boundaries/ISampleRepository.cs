using Insig.Domain.Samples;

namespace Insig.ApplicationServices.Boundaries
{
    public interface ISampleRepository
    {
        void EnsureThatSampleDoesNotExist(string name);
        void Store(Sample sample);
    }
}
