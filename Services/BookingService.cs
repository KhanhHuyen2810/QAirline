using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

public interface IBookingService
{
    Task<BookingResponse> CreateBookingAsync(BookingRequest bookingRequest);
    Task<IEnumerable<TicketDetailResponse>> GetTicketsByUsernameAsync(string username);
}

public class BookingService : IBookingService
{
    private readonly FlightBookingDbContext _context;

    public BookingService(FlightBookingDbContext context)
    {
        _context = context;
    }

    public async Task<BookingResponse> CreateBookingAsync(BookingRequest bookingRequest)
    {
        var customer = await _context.Customers
        .Where(c => c.CustomerUsername == bookingRequest.CustomerUsername)
        .FirstOrDefaultAsync();

        if (customer == null)
            return null;

        var flight = await _context.Flights
        .Where(f => f.FlightID == bookingRequest.FlightID)
        .FirstOrDefaultAsync();

        if (flight == null)
            return null;
        var ticketsQuantity = bookingRequest.Passengers.Count;

        // 1. Tạo booking trước
        var booking = new Booking
        {
            CustomerUsername = bookingRequest.CustomerUsername,
            Date = DateTime.Now,
            ExpiredDate = flight.Date,
            TicketsQuantity = ticketsQuantity
        };

        _context.Bookings.Add(booking);
        await _context.SaveChangesAsync();

        // 2. Tạo hành khách và vé cho mỗi hành khách
        foreach (var passengerInfo in bookingRequest.Passengers)
        {
            // 2.1 Tạo hành khách mới
            var passenger = new Passenger
            {
                PassengerName = passengerInfo.PassengerName,
                DateOfBirth = passengerInfo.DateOfBirth,
                PassportNumber = passengerInfo.PassportNumber,
                SeatNumber = passengerInfo.SeatNumber,
                BookingID = booking.BookingID
            };

            _context.Passengers.Add(passenger);
            await _context.SaveChangesAsync();

            // 2.2 Tạo vé cho hành khách (1 vé cho 1 hành khách)
            var ticket = new Ticket
            {
                FlightID = bookingRequest.FlightID,
                BookingID = booking.BookingID,
                PassengerID = passenger.PassengerID
            };
            _context.Tickets.Add(ticket);
        }


        await _context.SaveChangesAsync();

        // Trả về thông tin booking đã tạo
        return new BookingResponse
        {
            BookingID = booking.BookingID,
            TicketsQuantity = booking.TicketsQuantity
        };
    }
    public async Task<IEnumerable<TicketDetailResponse>> GetTicketsByUsernameAsync(string username)
    {
        var tickets = await (from ticket in _context.Tickets
                             join booking in _context.Bookings on ticket.BookingID equals booking.BookingID
                             join passenger in _context.Passengers on ticket.PassengerID equals passenger.PassengerID
                             join flight in _context.Flights on ticket.FlightID equals flight.FlightID
                             where booking.CustomerUsername == username
                             select new TicketDetailResponse
                             {
                                 TicketID = ticket.TicketID,
                                 FlightDate = flight.Date,
                                 Departure = flight.Departure,
                                 Destination = flight.Destination,
                                 Price = flight.BasePrice,
                                 PassengerName = passenger.PassengerName,
                                 DateOfBirth = passenger.DateOfBirth,
                                 PassportNumber = passenger.PassportNumber,
                                 SeatNumber = passenger.SeatNumber
                             }).ToListAsync();
        return tickets;
    }
}
