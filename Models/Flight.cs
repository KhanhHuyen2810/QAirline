using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class Flight
    {
        public int FlightID { get; set; } // Primary Key
        public DateTime Date { get; set; }
        public int Duration { get; set; }
        public decimal BasePrice { get; set; }
        public string Departure { get; set; }
        public string Destination { get; set; }
        public ICollection<Ticket> Tickets { get; set; } // Một chuyến bay có nhiều vé

    }
}