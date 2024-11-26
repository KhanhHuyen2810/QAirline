using Microsoft.EntityFrameworkCore;
using System.Net.Sockets;
using System.Security.Claims;

namespace WebApplication1.Data
{
    public class FlightBookingDbContext :DbContext
    {
        public FlightBookingDbContext(DbContextOptions<FlightBookingDbContext> options) : base(options) { }

        // Thêm DbSet cho các bảng trong database
        public DbSet<Models.Customer> Customers { get; set; }
        public DbSet<Models.Flight> Flights { get; set; }
        public DbSet<Models.Booking> Bookings { get; set; }
        public DbSet<Models.Ticket> Tickets { get; set; }
        public DbSet<Models.Passenger> Passengers { get; set; }
        public DbSet<Models.Airport> Airports { get; set; }
        public DbSet<Models.Class> Classes { get; set; }
    }
}

