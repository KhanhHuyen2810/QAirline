namespace WebApplication1.Models
{
    public class Flight
    {
        public int FlightID { get; set; } // Primary Key
        public DateTime Date { get; set; }
        public string Duration { get; set; }
        public string Departure { get; set; }
        public string Destination { get; set; }
        //public string AircraftType { get; set; }
        public decimal BasePrice { get; set; }
    }
}
