using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class Passenger
    {
        public int PassengerID { get; set; }
        public string PassengerName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PassportNumber { get; set; }
        public string SeatNumber { get; set; }
        public int BookingID { get; set; }
        // Navigation Properties
        [ForeignKey(nameof(BookingID))]
        public Booking Booking { get; set; } // Một hành khách thuộc một booking
    }
}