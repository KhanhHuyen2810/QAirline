public class BookingRequest
{
    public string CustomerUsername { get; set; }
    public List<PassengerInfo> Passengers { get; set; } 
    public int FlightID { get; set; }
}

public class PassengerInfo
{
    public string PassengerName { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string PassportNumber { get; set; }
    public string SeatNumber { get; set; }
}