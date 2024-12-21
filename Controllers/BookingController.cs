using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;

[Route("api/[controller]")]
[ApiController]
public class BookingController : ControllerBase
{
    private readonly IBookingService _bookingService;
    public BookingController(IBookingService bookingService)
    {
        _bookingService = bookingService;
    }

    // POST: api/Booking/{id} (Đặt vé, id là FlightID)
    [HttpPost("{id}")]
    public async Task<IActionResult> CreateBooking(int id, [FromBody] BookingRequest bookingRequest)
    {
        if (bookingRequest == null || !ModelState.IsValid)
            return BadRequest("Invalid data.");

        // Gán FlightID từ route vào bookingRequest
        bookingRequest.FlightID = id;

        // Gọi service để xử lý đặt vé
        var bookingResult = await _bookingService.CreateBookingAsync(bookingRequest);

        if (bookingResult == null)
            return StatusCode(500, "Booking failed.");

        return Ok(bookingResult);
    }

    // GET: api/Booking/{username} (Xem vé đã đặt)
    [HttpGet("{username}")]
    public async Task<IActionResult> GetBookingsByUsername(string username)
    {
        var tickets = await _bookingService.GetTicketsByUsernameAsync(username);

        if (tickets == null || !tickets.Any())
            return NotFound("No tickets found.");

        return Ok(tickets);
    }
}
