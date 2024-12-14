using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApplication1.Data;
using WebApplication1.Models;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models.DTO;

[ApiController]
[Route("api/login")]
public class LoginController : ControllerBase
{
    private readonly FlightBookingDbContext _context;
    private readonly IConfiguration _configuration;

    public LoginController(FlightBookingDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost]
    public IActionResult Login([FromBody] LoginModel model)
    {
        var customer = _context.Customers
                            .FirstOrDefault(c => c.CustomerUsername == model.Username);

        if (customer == null)
        {
            return Unauthorized("Tên đăng nhập không đúng.");
        }

        if (!BCrypt.Net.BCrypt.Verify(model.Password, customer.CustomerPassword))
        {
            return Unauthorized("Mật khẩu không đúng.");
        }

        string role = "Customer";  // Mặc định là Customer
        if (model.Username == "administrator" && BCrypt.Net.BCrypt.Verify("adminpassword", customer.CustomerPassword))
        {
            role = "Admin";
        }

        // Tạo JWT token và trả về cho người dùng
        var token = GenerateJwtToken(customer.CustomerUsername, role);
        return Ok(new { token = token, role = role });
    }
    private string GenerateJwtToken(string username, string role)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, username),
            new Claim(ClaimTypes.Role, role)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}