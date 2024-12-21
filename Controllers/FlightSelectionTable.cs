using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;

[ApiController]
[Route("api/[controller]")]
public class FlightSelectionController : ControllerBase
{
    private readonly FlightSelectionService _flightSelectionService;
    private readonly FlightBookingDbContext _context;

    public FlightSelectionController(FlightSelectionService flightService, FlightBookingDbContext context)
    {
        _flightSelectionService = flightService;
        _context = context;
    }

    [HttpGet("departures")]
    public async Task<IActionResult> GetDepartures()
    {
        var departures = await _context.Flights
            .Select(f => f.Departure)
            .Distinct()
            .ToListAsync();

        return Ok(departures);
    }

    [HttpGet("destinations")]
    public async Task<IActionResult> GetDestinations()
    {
        var destinations = await _context.Flights
            .Select(f => f.Destination)
            .Distinct()
            .ToListAsync();

        return Ok(destinations);
    }

    // API để tìm kiếm chuyến bay
    [HttpGet("search")]
    public async Task<IActionResult> SearchFlights([FromQuery] FlightSearchRequest request)
    {
        if (request == null)
            return BadRequest("Invalid search criteria.");

        var flights = await _flightSelectionService.SearchFlightsAsync(request);

        if (flights == null || !flights.Any())
            return NotFound("No flights found matching the criteria.");

        return Ok(flights);
    }
}
