using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.DTO
{
    public class FlightModel
    {
        [Required]
        public DateTime Date { get; set; }

        [Required]
        public int Duration { get; set; }

        [Required]
        public string Departure { get; set; }

        [Required]
        public string Destination { get; set; }
        //public string AircraftType { get; set; }

        [Required]
        public decimal BasePrice { get; set; }
    }
}