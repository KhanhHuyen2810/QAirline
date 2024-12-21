public class TicketDetailResponse
{
    public int TicketID { get; set; }
    public DateTime FlightDate { get; set; }
    public string Departure { get; set; }
    public string Destination { get; set; }
    public decimal Price { get; set; }
    public string PassengerName { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string PassportNumber { get; set; }
    public string SeatNumber { get; set; }
    public int TicketsQuantity { get; set; }
}
