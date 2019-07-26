using System.Collections.Generic;
using Insig.Domain.Samples;
using Insig.Infrastructure.DataModel.Context;

namespace Insig.Integration.Tests.Data
{
    public static class DataHelper
    {
        public static void PopulateTestData(InsigContext dbContext)
        {
            dbContext.Samples.Add(new Sample("Sample_1"));
            dbContext.Samples.Add(new Sample("Sample_2"));
            dbContext.Samples.Add(new Sample("Sample_3"));
            dbContext.SaveChanges();
        }

        public static List<string> GetTableNames()
        {
            return new List<string>
            {
                "Sample"
            };
        }
    }
}
