using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using WebApplication1.Data;
using WebApplication1.Migrations;
using WebApplication1.Models;
using WebApplication1.Models.DTO;

[AllowAnonymous]
[ApiController]
[Route("api/[controller]")]
public class TicketController : ControllerBase
{
    private readonly TicketService _ticketService;

    public TicketController(TicketService ticketService)
    {
        _ticketService = ticketService;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var tickets = await _ticketService.GetTickets();
        return Ok(tickets);
    }
}