using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [AllowAnonymous]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly FlightBookingDbContext _context;

        public HomeController(ILogger<HomeController> logger, FlightBookingDbContext dbContext)
        {
            _logger = logger;
            _context = dbContext;
        }
        [HttpGet]
        public IActionResult Homepage()
        {
            string customerName = null;

            // Kiểm tra nếu có token trong request
            if (Request.Headers.ContainsKey("Authorization"))
            {
                var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                var handler = new JwtSecurityTokenHandler();

                if (handler.CanReadToken(token))
                {
                    var jwtToken = handler.ReadJwtToken(token);

                    // Giả sử token chứa claim "username"
                    var usernameClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "Name")?.Value;

                    if (!string.IsNullOrEmpty(usernameClaim))
                    {
                        // Truy vấn customerName từ cơ sở dữ liệu dựa trên Username
                        var customer = _context.Customers.FirstOrDefault(c => c.CustomerUsername == usernameClaim);
                        if (customer != null)
                        {
                            customerName = customer.CustomerName;
                        }
                    }
                }
            }
            Console.WriteLine(customerName);    

            ViewBag.CustomerName = customerName;
            return View();
        }

        public IActionResult AirportDetail()
        {
            return View();
        }
        public IActionResult NewsPage()
        {
            return View();
        }
        public IActionResult LogIn()
        {
            return View();
        } 

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
