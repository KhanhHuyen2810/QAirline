using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using WebApplication1.Models;
using Microsoft.EntityFrameworkCore;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly FlightBookingDbContext _context;

        public NewsController(FlightBookingDbContext context)
        {
            _context = context;
        }

        // Lấy danh sách tin tức
        [HttpGet]
        public async Task<IActionResult> GetNews()
        {
            var news = await _context.News.ToListAsync();
            return Ok(news);
        }

        // Thêm tin tức mới
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] News news)
        {
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
