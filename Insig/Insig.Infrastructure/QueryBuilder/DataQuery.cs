using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;

namespace Insig.Infrastructure.QueryBuilder
{
    public class DataQuery<T>
    {
        private readonly IDbConnection _connection;

        public DataQuery(IDbConnection connection, string query, DynamicParameters parameters)
        {
            _connection = connection;

            Query = query;
            Parameters = parameters;
        }

        public string Query { get; }

        public DynamicParameters Parameters { get; }

        public List<T> ExecuteToList()
        {
            return _connection.Query<T>(Query, Parameters).ToList();
        }

        public T ExecuteToFirstElement()
        {
            return _connection.Query<T>(Query, Parameters).FirstOrDefault();
        }

        public T ExecuteSingle()
        {
            return _connection.Query<T>(Query, Parameters).SingleOrDefault();
        }
    }
}
