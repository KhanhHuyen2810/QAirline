using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;
using WebApplication1.Models.DTO;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly FlightBookingDbContext _context;
        private readonly AdminNewsService _newsService;

        public NewsController(FlightBookingDbContext context, IConfiguration configuration)
        {
            _context = context;
            _newsService = new AdminNewsService(configuration.GetConnectionString("FlightBookingDbContext"));
        }

        // Lấy danh sách tin tức
        [HttpGet("get")]
        public IActionResult Get()
        {
            var news = _newsService.GetNews();
            return Ok(news);
        }

        // Thêm tin tức mới
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] NewsCreateDto newsCreateDto)
        {

            var news = new News
            {
                NewsTitle = newsCreateDto.NewsTitle,
                NewsContent = newsCreateDto.NewsContent,
                ImageUrl = newsCreateDto.ImageUrl
            };
            if (ModelState.IsValid)
            {
                _context.News.Add(news);
                await _context.SaveChangesAsync();
                return Ok(news);
            }
            return BadRequest(ModelState);
        }

        // Sửa tin tức
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] News news)
        {
            if (id != news.NewsID) return BadRequest("ID không khớp");

            _context.Entry(news).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.News.Any(e => e.NewsID == id))
                    return NotFound();
                throw;
            }

            return Ok(news);
        }

        // Xóa tin tức
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var news = await _context.News.FindAsync(id);
            if (news == null) return NotFound();

            _context.News.Remove(news);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Xóa thành công!" });
        }

        // Lấy chi tiết tin tức
        [HttpGet("details/{id}")]
        public async Task<IActionResult> Details(int id)
        {
            var news = await _context.News.FindAsync(id);
            if (news == null) return NotFound();

            return Ok(news);
        }
    }
}
