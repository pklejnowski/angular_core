using PublishedLanguage.Dtos;
using PublishedLanguage.Queries;

namespace Insig.ApplicationServices.Boundaries
{
    public interface ISampleQuery
    {
        SampleDTO GetSampleData(SampleParameter query);
    }
}
