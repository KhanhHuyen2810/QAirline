using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
        private readonly ILogger<AdminController> _logger;

        public AdminController(ILogger<AdminController> logger)
        {
            _logger = logger;
        }
        public IActionResult Dashboard()
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString();
            if (!string.IsNullOrEmpty(token))
            {
                Console.WriteLine($"Token nhận được: {token}");
            }
            else
            {
                Console.WriteLine("Token không được gửi kèm trong request.");
            }

            Console.WriteLine("Dashboard action được gọi.");
            return View();
        }

        [HttpGet]
        public IActionResult GetTabContent(string tab)
        {
            switch (tab)
            {
                case "dashboard":
                    return PartialView("Dashboard");
                case "tickets":
                    return PartialView("Tickets");
                case "flights":
                    return PartialView("Flights");
                case "news":
                    return PartialView("News");
                default:
                    return Content("Tab không hợp lệ");
            }
        }
    }
}
