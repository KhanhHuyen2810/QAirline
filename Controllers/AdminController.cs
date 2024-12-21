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
        public IActionResult Flights()
        {
            return View();
        }
        [Authorize(Roles = "Admin")]
        public IActionResult News()
        {
            return View();
        }
        [Authorize(Roles = "Admin")]
        public IActionResult Tickets()
        {
            return View();
        }
    }
}
