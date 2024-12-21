using WebApplication1.Data;
using WebApplication1.Models;
using Microsoft.EntityFrameworkCore;

public class FlightSelectionService
{
    private readonly FlightBookingDbContext _context;

    public FlightSelectionService(FlightBookingDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<FlightDetailResponse>> SearchFlightsAsync(FlightSearchRequest request)
    {
        var query = _context.Flights.AsQueryable();

        // Áp dụng bộ lọc điều kiện
        if (!string.IsNullOrEmpty(request.Departure))
        {
            query = query.Where(f => f.Departure == request.Departure);
        }

        if (!string.IsNullOrEmpty(request.Destination))
        {
            query = query.Where(f => f.Destination == request.Destination);
        }

        if (request.Date.HasValue)
        {
            query = query.Where(f => f.Date.Date == request.Date.Value.Date); // So sánh theo ngày
        }

        // Lấy danh sách chuyến bay và ánh xạ sang FlightResponse
        var flights = await query.Select(f => new FlightDetailResponse
        {
            FlightID = f.FlightID,
            Departure = f.Departure,
            Destination = f.Destination,
            Date = f.Date,
            BasePrice = f.BasePrice,
            Duration = f.Duration
        }).ToListAsync();

        return flights;
    }
}
