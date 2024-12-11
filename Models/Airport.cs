using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class Airport
    {
        public string AirportName { get; set; }
        [Key]
        public string iataCode { get; set; } //Primary Key
        public string icaoCode { get; set; }
        public string AirportLocation { get; set; }
        public string AirportType { get; set; }
        // Navigation Properties
        public ICollection<Flight> Flights { get; set; } // Một sân bay có nhiều chuyến bay
    }
}