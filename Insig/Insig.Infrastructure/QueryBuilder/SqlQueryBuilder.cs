using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using EnsureThat;

namespace Insig.Infrastructure.QueryBuilder;

public class SqlQueryBuilder
{
    private readonly IDbConnection _connection;

    private List<string> _columnsToSelect;
    private string _dataSource;
    private List<string> _whereConditions;
    private SqlQueryParameters _parameters;

    private bool _isDistinct;

    public SqlQueryBuilder(IDbConnection connection)
    {
        _connection = connection;

        Reset();
    }

    public SqlQueryBuilder Select(params string[] columns)
    {
        EnsureArg.IsNotNull(columns, nameof(columns));

        var splitColumns = columns.Select(c => c.Trim());
        _columnsToSelect.AddRange(splitColumns);

        return this;
    }

    public SqlQueryBuilder SelectDistinct(params string[] columns)
    {
        _isDistinct = true;

        return Select(columns);
    }

    public SqlQueryBuilder From(string dataSource)
    {
        Ensure.String.IsNotNullOrWhiteSpace(dataSource, nameof(dataSource));

        _dataSource = dataSource;

        return this;
    }

    public SqlQueryBuilder Where<T>(string column, T value) where T : struct
    {
        AddFilter(column, " = ", value);

        return this;
    }

    public SqlQueryBuilder Where<T>(string column, T? value) where T : struct
    {
        if (value == null)
        {
            return this;
        }

        AddFilter(column, " = ", value.Value);

        return this;
    }

    public SqlQueryBuilder Where(string column, string value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return this;
        }

        AddFilter(column, " = ", value);

        return this;
    }

    public DataQuery<T> BuildQuery<T>()
    {
        var selectQuery = BuildSelectQuery();
        var query = new DataQuery<T>(_connection, selectQuery, _parameters);

        Reset();
        return query;
    }

    private string BuildSelectQuery()
    {
        var builder = new StringBuilder();
        builder.Append("SELECT ");

        if (_isDistinct)
        {
            builder.Append("DISTINCT ");
        }

        builder.Append(string.Join(", ", _columnsToSelect.Where(c => !string.IsNullOrEmpty(c))));

        builder.Append($" FROM {_dataSource} ");

        if (_whereConditions.Any())
        {
            builder.Append(" WHERE " + string.Join(" AND ", _whereConditions.Where(c => !string.IsNullOrEmpty(c))));
        }

        return builder.ToString();
    }

    private void AddFilter(string column, string filterOperator, object valueToFilter)
    {
        Ensure.String.IsNotNullOrWhiteSpace(column, nameof(column));
        Ensure.String.IsNotNullOrWhiteSpace(filterOperator, nameof(filterOperator));
        EnsureArg.IsNotNull(valueToFilter, nameof(valueToFilter));

        var paramName = _parameters.GetNextParameterName();
        _parameters.Add(paramName, valueToFilter);

        _whereConditions.Add(string.Concat(column, filterOperator, paramName));
    }

    private void Reset()
    {
        _columnsToSelect = new List<string>();
        _dataSource = null;
        _whereConditions = new List<string>();

        _parameters = new SqlQueryParameters();
        _isDistinct = false;
    }
}