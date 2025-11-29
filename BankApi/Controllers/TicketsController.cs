using BankApi.Data;
using BankApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class TicketsController : ControllerBase
{
    private readonly AppDbContext _context;
    public TicketsController(AppDbContext context) => _context = context;

    [HttpPost("{categoryId}")]
    public async Task<IActionResult> CreateTicket(int categoryId)
    {
        var category = await _context.Categories.FindAsync(categoryId);
        if (category == null) return NotFound("Kategori bulunamadı.");

        // Aralıkları belirle
        int startRange = categoryId switch
        {
            1 => 100, // Gişe TC
            2 => 200, // Gişe Vergi
            3 => 300, // Gişe Telefon
            4 => 400, // Bireysel TC
            5 => 500, // Bireysel Vergi
            6 => 600, // Bireysel Telefon
            _ => 100
        };
        int endRange = startRange + 99;

        // Son numarayı bul
        int lastTicket = await _context.Tickets
            .Where(t => t.CategoryId == categoryId && t.TicketNumber >= startRange && t.TicketNumber <= endRange)
            .OrderByDescending(t => t.TicketNumber)
            .Select(t => t.TicketNumber)
            .FirstOrDefaultAsync();

        int newTicketNumber = lastTicket == 0 ? startRange : lastTicket + 1;

        // Yeni Ticket oluştur
        var ticket = new Ticket
        {
            CategoryId = categoryId,
            TicketNumber = newTicketNumber
        };
        _context.Tickets.Add(ticket);
        await _context.SaveChangesAsync();

        // Process oluştur
        var process = new Process
        {
            TicketId = ticket.Id,
            CategoryId = categoryId,
            Status = "Bekliyor"
        };
        _context.Processes.Add(process);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            ticketNumber = ticket.TicketNumber,
            processId = process.Id,
            status = process.Status
        });
    }
}
