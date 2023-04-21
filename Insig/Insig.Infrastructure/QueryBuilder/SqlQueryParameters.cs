using Dapper;

namespace Insig.Infrastructure.QueryBuilder;

public sealed class SqlQueryParameters : DynamicParameters
{
    private int _parameterGenerator;

    public SqlQueryParameters()
    {
        _parameterGenerator = 0;
    }

    public string GetNextParameterName()
    {
        _parameterGenerator++;

        return "@p" + _parameterGenerator;
    }

    public void Add(string name, object value)
    {
        base.Add(name, value);
    }
}