using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[AllowAnonymous]
[ApiController]
[Route("api/[controller]")]
public class AirportController : ControllerBase
{
    private readonly AirportService _airportService;

    public AirportController(IConfiguration configuration)
    {
        _airportService = new AirportService(configuration.GetConnectionString("FlightBookingDbContext"));
    }

    [HttpGet]
    public IActionResult Get()
    {
        var airports = _airportService.GetAirports();
        return Ok(airports);
    }
}
