using Microsoft.EntityFrameworkCore;
using System.Net.Sockets;
using System.Security.Claims;
using WebApplication1.Models;

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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>()
                .HasKey(c => c.CustomerID);

            modelBuilder.Entity<Flight>()
                .HasKey(f => f.FlightID);

            modelBuilder.Entity<Booking>()
                .HasKey(b => b.BookingID);

            modelBuilder.Entity<Ticket>()
                .HasKey(t => t.TicketID);

            modelBuilder.Entity<Passenger>()
                .HasKey(p => p.PassengerID);

            modelBuilder.Entity<Airport>()
                .HasKey(a => a.iataCode);

            modelBuilder.Entity<Class>()
                .HasKey(c => c.ClassID);         
        }
    }
}

