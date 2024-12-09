using System.ComponentModel.DataAnnotations;

public class RegisterDto
{
    [Required]
    public string Username { get; set; }
    [Required]
    public string PhoneNumber { get; set; }
    [Required, MinLength(6)]
    public string Password { get; set; }
    [Required]
    public string CustomerName { get; set; }
    [Required]
    public DateTime DoB { get; set; }
}
