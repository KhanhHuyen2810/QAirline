using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class Ticket
    {
        public int TicketID { get; set; }
        public string SeatNumber { get; set; }
        public int FlightID { get; set; }
        public int ClassID { get; set; }
        public int BookingID { get; set; }
        public int PassengerID { get; set; }
        public decimal TicketPrice { get; set; }
        // Navigation Properties
        [ForeignKey(nameof(FlightID))]
        public Flight Flight { get; set; } // Một vé thuộc một chuyến bay

        [ForeignKey(nameof(ClassID))]
        public Class Class { get; set; } // Một vé thuộc một hạng ghế

        [ForeignKey(nameof(BookingID))]
        public Booking Booking { get; set; } // Một vé thuộc về một booking

        [ForeignKey(nameof(PassengerID))]
        public Passenger Passenger { get; set; } // Một vé có thể được gắn với hành khách
    }
}