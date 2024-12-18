using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.DTO
{
    public class NewsCreateDto
    {
        [Required]
        public string NewsTitle { get; set; }

        [Required]
        public string NewsContent { get; set; }

        public string ImageUrl { get; set; }
    }
}
