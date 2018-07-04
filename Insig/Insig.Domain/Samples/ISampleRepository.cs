namespace Insig.Domain.Samples
{
    public interface ISampleRepository
    {
        void EnsureThatSampleDoesNotExist(string name);
        void Store(Sample sample);
    }
}
