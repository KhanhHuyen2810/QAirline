using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{
    public class AdminController : Controller
    {
        private readonly ILogger<AdminController> _logger;

        public AdminController(ILogger<AdminController> logger)
        {
            _logger = logger;
        }
        public IActionResult Dashboard()
        {
            return View();
        }
        [Authorize(Roles = "Admin")]
        public IActionResult Flights(string token)
        {
            if (!string.IsNullOrEmpty(token))
            {
                Console.WriteLine($"Token nhận được: {token}");
            }
            else
            {
                Console.WriteLine("Token không được gửi kèm trong query.");
            }

            ViewBag.Token = token;
            return View();
        }
        [Authorize(Roles = "Admin")]
        public IActionResult News(string token)
        {
            if (!string.IsNullOrEmpty(token))
            {
                Console.WriteLine($"Token nhận được: {token}");
            }
            else
            {
                Console.WriteLine("Token không được gửi kèm trong query.");
            }

            ViewBag.Token = token;
            return View();
        }
        [Authorize(Roles = "Admin")]
        public IActionResult Tickets(string token)
        {
            if (!string.IsNullOrEmpty(token))
            {
                Console.WriteLine($"Token nhận được: {token}");
            }
            else
            {
                Console.WriteLine("Token không được gửi kèm trong query.");
            }

            ViewBag.Token = token;
            return View();
        }
    }
}
