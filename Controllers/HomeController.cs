using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly FlightBookingDbContext _context;

        public HomeController(ILogger<HomeController> logger, FlightBookingDbContext dbContext)
        {
            _logger = logger;
            _context = dbContext;
        }
        public IActionResult GetCustomerName()
        {
            string customerName = null;

            if (Request.Headers.ContainsKey("Authorization"))
            {
                var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                var handler = new JwtSecurityTokenHandler();

                if (handler.CanReadToken(token))
                {
                    var jwtToken = handler.ReadJwtToken(token);
                    var usernameClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")?.Value;

                    if (!string.IsNullOrEmpty(usernameClaim))
                    {
                        var customer = _context.Customers.FirstOrDefault(c => c.CustomerUsername == usernameClaim);
                        if (customer != null)
                        {
                            customerName = customer.CustomerName;
                        }
                    }
                }
            }
            Debug.WriteLine(customerName);
            // Trả về customerName dưới dạng JSON
            return Json(new { customerName });
        }
        public IActionResult Homepage()
        {
            return View();
        }
        public IActionResult AirportDetail()
        {
            return PartialView("AirportDetail");
        }
        public IActionResult NewsPage()
        {
            return PartialView("NewsPage");
        }
        public IActionResult LogIn()
        {
            return PartialView("LogIn");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
