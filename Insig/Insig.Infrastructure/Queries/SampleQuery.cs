using System.Collections.Generic;
using System.Linq;
using EnsureThat;
using Insig.ApplicationServices.Boundaries;
using Insig.Infrastructure.DataModel.Context;
using Insig.PublishedLanguage.Dtos;
using Insig.PublishedLanguage.Queries;

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

        public List<SampleDTO> GetSampleData(SampleParameter query)
        {
            return _context.Samples.Select(r => new SampleDTO { Name = r.Name }).ToList();
        }
    }
}
