using System.Linq;
using EnsureThat;
using Insig.Common.Exceptions;
using Insig.Domain.Samples;
using Insig.Infrastructure.DataModel.Context;

namespace Insig.Infrastructure.Domain
{
    public class SampleRepository : ISampleRepository
    {
        private readonly InsigContext _context;

        public SampleRepository(InsigContext context)
        {
            EnsureArg.IsNotNull(context, nameof(context));
            _context = context;
        }

        public void EnsureThatSampleDoesNotExist(string name)
        {
            var sample = _context.Samples.FirstOrDefault(r => r.Name == name);
            if (sample != null)
            {
                throw new DomainException($"Provided sample name: \"{name}\" already exist.");
            }
        }

        public void Store(Sample sample)
        {
            _context.Samples.Add(sample);
        }
    }
}
