using System.Collections.Generic;
using Insig.PublishedLanguage.Dtos;
using Insig.PublishedLanguage.Queries;

namespace Insig.ApplicationServices.Boundaries
{
    public interface ISampleQuery
    {
        List<SampleDTO> GetSampleData(SampleParameter query);
    }
}
