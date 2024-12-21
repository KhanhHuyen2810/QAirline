using Microsoft.Data.SqlClient;

public class FlightService
{
    private readonly string _connectionString;

    public FlightService(string connectionString)
    {
        _connectionString = connectionString;
    }

    public List<Dictionary<string, string>> GetFlights()
    {
        var flights = new List<Dictionary<string, string>>();

        using (var connection = new SqlConnection(_connectionString))
        {
            connection.Open();
            var command = new SqlCommand("SELECT * FROM Flights", connection);
            var reader = command.ExecuteReader();

            while (reader.Read())
            {
                var flight = new Dictionary<string, string>
                {
                    { "FlightID", reader["FlightID"]?.ToString() ?? "0" },
                    { "Date", reader["Date"]?.ToString() ?? string.Empty },
                    { "Duration", reader["Duration"]?.ToString() ?? "0" },
                    { "Departure", reader["Departure"]?.ToString() ?? string.Empty },
                    { "Destination", reader["Destination"]?.ToString() ?? string.Empty },
                    { "BasePrice", reader["BasePrice"]?.ToString() ?? string.Empty },
                };

                flights.Add(flight);
            }
        }

        return flights;
    }
}