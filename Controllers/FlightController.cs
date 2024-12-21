using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;
using WebApplication1.Models.DTO;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightController : ControllerBase
    {
        private readonly FlightBookingDbContext _context;
        private readonly FlightService _flightService;

        public FlightController(FlightBookingDbContext context, IConfiguration configuration)
        {
            _context = context;
            _flightService = new FlightService(configuration.GetConnectionString("FlightBookingDbContext"));
        }

        // Lấy danh sách chuyến bay
        [HttpGet("get")]
        public IActionResult Get()
        {
            var flights = _flightService.GetFlights();
            return Ok(flights);
        }

        // Thêm chuyến bay mới
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] FlightModel flightModel)
        {
            var flight = new Flight
            {
                Date = flightModel.Date, // Sử dụng DateTime trực tiếp
                Duration = flightModel.Duration,
                Departure = flightModel.Departure,
                Destination = flightModel.Destination,
                BasePrice = flightModel.BasePrice // Đảm bảo định dạng BasePrice
            };

            if (ModelState.IsValid)
            {
                _context.Flights.Add(flight);
                await _context.SaveChangesAsync();
                return Ok(flight);
            }
            return BadRequest(ModelState);
        }

        // Sửa tin tức
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] Flight flight)
        {
            if (id != flight.FlightID) return BadRequest("ID không khớp");

            _context.Entry(flight).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Flights.Any(e => e.FlightID == id))
                    return NotFound();
                throw;
            }

            return Ok(flight);
        }

        // Xóa tin tức
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var flight = await _context.Flights.FindAsync(id);
            if (flight == null) return NotFound();

            _context.Flights.Remove(flight);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Xóa thành công!" });
        }

        // Lấy chi tiết tin tức
        [HttpGet("details/{id}")]
        public async Task<IActionResult> Details(int id)
        {
            var flights = await _context.Flights.FindAsync(id);
            if (flights == null) return NotFound();

            return Ok(flights);
        }
    }
}