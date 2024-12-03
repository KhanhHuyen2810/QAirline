namespace WebApplication1.Models
{
    public class Airport
    {
        public string AirportName { get; set; }
        public string iataCode { get; set; } //Primary Key
        public string icaoCode { get; set; }
        public string AirportLocation { get; set; }
        public string AirportType { get; set; }
    }
}
