using Insig.PublishedLanguage.Dtos;
using Insig.PublishedLanguage.Queries;

namespace Insig.ApplicationServices.Boundaries
{
    public interface ISampleQuery
    {
        SampleDTO GetSampleData(SampleParameter query);
    }
}
