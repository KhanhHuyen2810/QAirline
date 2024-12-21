using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class Booking
    {
        public int BookingID { get; set; }
        public string CustomerUsername { get; set; }
        public DateTime Date { get; set; }
        public DateTime ExpiredDate { get; set; }
        public int TicketsQuantity { get; set; }

        // Navigation Properties
        [ForeignKey(nameof(CustomerUsername))]
        public Customer Customer { get; set; } // Một booking thuộc về một khách hàng
        public ICollection<Ticket> Tickets { get; set; } // Một booking có nhiều ticket
        public ICollection<Passenger> Passengers { get; set; } // Một booking có nhiều hành khách
    }
}