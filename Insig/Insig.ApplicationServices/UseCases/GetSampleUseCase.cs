using System.Collections.Generic;
using EnsureThat;
using Insig.ApplicationServices.Boundaries;
using Insig.Common.CQRS;
using Insig.PublishedLanguage.Dtos;
using Insig.PublishedLanguage.Queries;

namespace Insig.ApplicationServices.UseCases
{
    public class GetSampleUseCase : IQueryHandler<SampleParameter, List<SampleDTO>>
    {
        private readonly ISampleQuery _sampleQuery;

        public GetSampleUseCase(ISampleQuery sampleQuery)
        {
            EnsureArg.IsNotNull(sampleQuery, nameof(sampleQuery));

            _sampleQuery = sampleQuery;
        }

        public List<SampleDTO> Handle(SampleParameter query)
        {
            return _sampleQuery.GetSampleData(query);
        }
    }
}
