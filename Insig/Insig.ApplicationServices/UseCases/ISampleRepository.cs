using Insig.Domain.Samples;

namespace Insig.ApplicationServices.UseCases
{
    public interface ISampleRepository
    {
        void EnsureThatSampleDoesNotExist(string name);
        void Store(Sample sample);
    }
}
