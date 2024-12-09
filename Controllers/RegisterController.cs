using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using WebApplication1.Models;
using BCrypt.Net;

[ApiController]
[Route("api/register")]
public class RegisterController : ControllerBase
{
    private readonly FlightBookingDbContext _dbContext;

    public RegisterController(FlightBookingDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost]
    public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
    {
        var existingCustomer = await _dbContext.Customers.FindAsync(registerDto.Username);
        if (existingCustomer != null)
        {
            return BadRequest("Tên người dùng đã được sử dụng. Vui lòng chọn tên khác!");
        }

        if (!ModelState.IsValid)
            return BadRequest(new { message = "Dữ liệu không hợp lệ." });

        var newCustomer = new Customer
        {
            CustomerUsername = registerDto.Username,
            PhoneNumber = registerDto.PhoneNumber,
            CustomerName = registerDto.CustomerName,
            DoB = registerDto.DoB,
            CustomerPassword = BCrypt.Net.BCrypt.HashPassword(registerDto.Password)
        };

        _dbContext.Customers.Add(newCustomer);
        await _dbContext.SaveChangesAsync();

        return Ok(new { message = "Đăng ký tài khoản thành công!" });
    }
}
