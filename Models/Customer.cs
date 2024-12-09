namespace WebApplication1.Models
{
    public class Customer
    {
        public string CustomerUsername { get; set; } // Primary Key
        public string CustomerPassword { get; set; }
        public string CustomerName { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DoB { get; set; }
    }
}
