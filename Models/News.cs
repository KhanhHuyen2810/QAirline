using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class News
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int NewsID { get; set; }  // Primary Key

        [Required]
        public string NewsTitle { get; set; }

        [Required]
        public string NewsContent { get; set; }

        public string ImageUrl { get; set; }  // Đường dẫn hình ảnh
    }
}
