using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WebApplication1.Data;
using WebApplication1.Models.DTO;

[ApiController]
[Route("api/login")]
public class LoginController : ControllerBase
{
    private readonly FlightBookingDbContext _context;

    public LoginController(FlightBookingDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult Login([FromBody] LoginModel model)
    {
        // Kiểm tra người dùng có tồn tại trong cơ sở dữ liệu không
        var customer = _context.Customers
            .FirstOrDefault(c => c.CustomerUsername == model.Username);

        if (customer == null)
        {
            return Unauthorized("Tên đăng nhập không đúng.");
        }

        // So sánh mật khẩu đã mã hóa trong cơ sở dữ liệu với mật khẩu người dùng nhập vào
        var passwordValid = BCrypt.Net.BCrypt.Verify(model.Password, customer.CustomerPassword);
        if (!passwordValid)
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
        return Ok(new { Token = token, Role = role });

    }

    private string GenerateJwtToken(string username, string role)
    {
        // Logic tạo JWT token (như đã mô tả trong các ví dụ trước)
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, username),
            new Claim(ClaimTypes.Role, role )
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("my-very-strong-and-long-secret-key"));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            issuer: "MyAuthService",
            audience: "MyAppClient",
            claims: claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}


