using Microsoft.Data.SqlClient;

public class AirportService
{
    private readonly string _connectionString;

    public AirportService(string connectionString)
    {
        _connectionString = connectionString;
    }

    public List<Dictionary<string, string>> GetAirports()
    {
        var airports = new List<Dictionary<string, string>>();

        using (var connection = new SqlConnection(_connectionString))
        {
            connection.Open();
            var command = new SqlCommand("SELECT * FROM Airports", connection);
            var reader = command.ExecuteReader();

            while (reader.Read())
            {
                var airport = new Dictionary<string, string>
                {
                    { "Name", reader["AirportName"]?.ToString() ?? string.Empty },
                    { "Location", reader["AirportLocation"]?.ToString() ?? string.Empty },
                    { "IATACode", reader["iataCode"]?.ToString() ?? string.Empty },
                    { "ICAOCode", reader["icaoCode"]?.ToString() ?? string.Empty },
                    { "Type", reader["AirportType"]?.ToString() ?? string.Empty }
                };

                airports.Add(airport);
            }
        }

        return airports;
    }
}
