using System.Collections.Generic;
using EnsureThat;
using Insig.ApplicationServices.Boundaries;
using Insig.Infrastructure.QueryBuilder;
using Insig.PublishedLanguage.Dtos;
using Insig.PublishedLanguage.Queries;

namespace Insig.Infrastructure.Queries
{
    public class SampleQuery : ISampleQuery
    {
        private readonly SqlQueryBuilder _sqlQueryBuilder;

        public SampleQuery(SqlQueryBuilder sqlQueryBuilder)
        {
            EnsureArg.IsNotNull(sqlQueryBuilder, nameof(sqlQueryBuilder));

            _sqlQueryBuilder = sqlQueryBuilder;
        }

        public List<SampleDTO> GetSampleData(SampleParameter query)
        {
            return _sqlQueryBuilder
                .Select("Name")
                .From("Sample")
                .BuildQuery<SampleDTO>()
                .ExecuteToList();
        }
    }
}
