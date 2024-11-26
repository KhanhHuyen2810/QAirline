namespace WebApplication1.Models
{
    public class Booking
    {
        public int BookingID { get; set; }
        public int CustomerID { get; set; }
        public DateTime Date { get; set; }
        public DateTime ExpiredDate { get; set; }
        public int TicketsQuantity { get; set; }
        public string PaymentStatus { get; set; }
    }
}
