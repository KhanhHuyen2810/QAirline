namespace WebApplication1.Models
{
    public class Class
    {
        public int ClassID { get; set; }
        public string ClassName { get; set; }
        // Navigation Properties
        public ICollection<Ticket> Tickets { get; set; } // Một hạng ghế có nhiều vé
    }
}