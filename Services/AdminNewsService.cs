using Microsoft.Data.SqlClient;

public class AdminNewsService
{
    private readonly string _connectionString;

    public AdminNewsService(string connectionString)
    {
        _connectionString = connectionString;
    }

    public List<Dictionary<string, string>> GetNews()
    {
        var news = new List<Dictionary<string, string>>();

        using (var connection = new SqlConnection(_connectionString))
        {
            connection.Open();
            var command = new SqlCommand("SELECT * FROM News", connection);
            var reader = command.ExecuteReader();

            while (reader.Read())
            {
                var _news = new Dictionary<string, string>
                {
                    { "NewsID", reader["NewsID"]?.ToString() ?? "0" },
                    { "NewsTitle", reader["NewsTitle"]?.ToString() ?? string.Empty },
                    { "NewsContent", reader["NewsContent"]?.ToString() ?? string.Empty },
                    { "ImageUrl", reader["ImageUrl"]?.ToString() ?? string.Empty },
                };

                news.Add(_news);
            }
        }

        return news;
    }
}
