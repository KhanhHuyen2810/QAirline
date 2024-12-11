using Microsoft.EntityFrameworkCore;
using System.Net.Sockets;
using System.Security.Claims;
using WebApplication1.Models;

namespace WebApplication1.Data
{
    public class FlightBookingDbContext : DbContext
    {
        public FlightBookingDbContext(DbContextOptions<FlightBookingDbContext> options) : base(options) { }

        //// Thêm DbSet cho các bảng trong database
        //public DbSet<Models.Customer> Customers { get; set; }
        //public DbSet<Models.Flight> Flights { get; set; }
        //public DbSet<Models.Booking> Bookings { get; set; }
        //public DbSet<Models.Ticket> Tickets { get; set; }
        //public DbSet<Models.Passenger> Passengers { get; set; }
        //public DbSet<Models.Airport> Airports { get; set; }
        //public DbSet<Models.Class> Classes { get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Customer>()
        //        .HasKey(c => c.CustomerID);

        //    modelBuilder.Entity<Flight>()
        //        .HasKey(f => f.FlightID);

        //    modelBuilder.Entity<Booking>()
        //        .HasKey(b => b.BookingID);

        //    modelBuilder.Entity<Ticket>()
        //        .HasKey(t => t.TicketID);

        //    modelBuilder.Entity<Passenger>()
        //        .HasKey(p => p.PassengerID);

        //    modelBuilder.Entity<Airport>()
        //        .HasKey(a => a.iataCode);

        //    modelBuilder.Entity<Class>()
        //        .HasKey(c => c.ClassID);         
        //}
        // DbSet cho các bảng
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Passenger> Passengers { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Flight> Flights { get; set; }
        public DbSet<Class> Classes { get; set; }
        public DbSet<Airport> Airports { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // **Thiết lập quan hệ giữa các bảng**

            modelBuilder.Entity<Airport>()
                .HasKey(a => a.iataCode);
            // Customer - Booking: 1-N
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Customer)
                .WithMany(c => c.Bookings)
                .HasForeignKey(b => b.CustomerUsername);

            // Booking - Passenger: 1-N
            modelBuilder.Entity<Passenger>()
                .HasOne(p => p.Booking)
                .WithMany(b => b.Passengers)
                .HasForeignKey(p => p.BookingID);

            // Booking - Ticket: 1-N
            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Booking)
                .WithMany(b => b.Tickets)
                .HasForeignKey(t => t.BookingID);

            // Flight - Ticket: 1-N
            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Flight)
                .WithMany(f => f.Tickets)
                .HasForeignKey(t => t.FlightID);

            // Class - Ticket: 1-N
            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Class)
                .WithMany(c => c.Tickets)
                .HasForeignKey(t => t.ClassID);

            // Passenger - Ticket: 1-1 (optional foreign key)
            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Passenger)
                .WithOne()
                .HasForeignKey<Ticket>(t => t.PassengerID)
                .IsRequired(false);

        }
    }
}
