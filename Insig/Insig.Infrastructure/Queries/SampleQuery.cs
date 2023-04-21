using System.Collections.Generic;
using System.Threading.Tasks;
using EnsureThat;
using Insig.ApplicationServices.Boundaries;
using Insig.Infrastructure.QueryBuilder;
using Insig.PublishedLanguage.Dtos;
using Insig.PublishedLanguage.Queries;

namespace Insig.Infrastructure.Queries;

public class SampleQuery : ISampleQuery
{
    private readonly SqlQueryBuilder _sqlQueryBuilder;

    public SampleQuery(SqlQueryBuilder sqlQueryBuilder)
    {
        EnsureArg.IsNotNull(sqlQueryBuilder, nameof(sqlQueryBuilder));

        _sqlQueryBuilder = sqlQueryBuilder;
    }

    public async Task<List<SampleDTO>> GetSampleData(SampleParameter query)
    {
        return await _sqlQueryBuilder
            .Select("Name")
            .From("Sample")
            .BuildQuery<SampleDTO>()
            .ExecuteToList();
    }
}