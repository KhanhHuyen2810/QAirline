using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class Customer
    {
        [Key]
        public string CustomerUsername { get; set; } // Primary Key
        public string CustomerPassword { get; set; }
        public string CustomerName { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DoB { get; set; }
        // Navigation Properties
        public ICollection<Booking> Bookings { get; set; }
    }
}
