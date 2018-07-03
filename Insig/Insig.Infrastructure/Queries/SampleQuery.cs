using System.Linq;
using EnsureThat;
using Insig.ApplicationServices.Boundaries;
using Insig.Infrastructure.DataModel.Context;
using PublishedLanguage.Dtos;
using PublishedLanguage.Queries;

namespace Insig.Infrastructure.Queries
{
    public class SampleQuery : ISampleQuery
    {
        private readonly InsigContext _context;

        public SampleQuery(InsigContext context)
        {
            EnsureArg.IsNotNull(context, nameof(context));

            _context = context;
        }

        public SampleDTO GetSampleData(SampleParameter query)
        {
            var result = _context.Samples.First();

            return new SampleDTO { Id = result.Id, Name = result.Name };
        }
    }
}
