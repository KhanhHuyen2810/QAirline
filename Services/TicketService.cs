using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;

public class TicketService
{
    private readonly FlightBookingDbContext _context;

    public TicketService(FlightBookingDbContext dbContext)
    {
        _context = dbContext;
    }

    public async Task<IEnumerable<TicketQuantity>> GetTickets()
    {
        var flights = await _context.Flights
            .Select(flight => new
            {
                FlightID = flight.FlightID,
                FlightDate = flight.Date,
                Departure = flight.Departure,
                Destination = flight.Destination,
            })
            .ToListAsync();

        var tickets = await _context.Tickets
            .Join(
                _context.Bookings,
                ticket => ticket.BookingID,
                booking => booking.BookingID,
                (ticket, booking) => new { ticket.FlightID, booking.TicketsQuantity }
            )
            .ToListAsync();

        var result = flights
            .GroupJoin(
                tickets,
                flight => flight.FlightID,
                ticket => ticket.FlightID,
                (flight, ticketsGroup) => new TicketQuantity
                {
                    FlightID = flight.FlightID,
                    FlightDate = flight.FlightDate,
                    Departure = flight.Departure,
                    Destination = flight.Destination,
                    TicketsQuantity = ticketsGroup.Sum(t => t.TicketsQuantity)
                })
            .ToList();

        return result;
    }
}