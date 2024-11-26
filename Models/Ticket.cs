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
    }
}
