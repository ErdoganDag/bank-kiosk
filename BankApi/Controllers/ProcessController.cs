using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BankApi.Data;
using BankApi.Models;

namespace BankApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProcessController : ControllerBase
    {
        private readonly BankDbContext _context;

        public ProcessController(BankDbContext context)
        {
            _context = context;
        }

        // Yeni işlem ekle
        [HttpPost]
        public async Task<IActionResult> AddProcess([FromBody] Process process)
        {
            _context.Processes.Add(process);
            await _context.SaveChangesAsync();
            return Ok(process);
        }

        // Aktif işlemleri getir
        [HttpGet("active")]
        public async Task<IActionResult> GetActiveProcesses()
        {
            var active = await _context.Processes
                .Include(p => p.Ticket)
                .ThenInclude(t => t.Category)
                .Where(p => p.Status == "Active")
                .ToListAsync();

            return Ok(active);
        }

        // Durum güncelle
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] string newStatus)
        {
            var process = await _context.Processes.FindAsync(id);
            if (process == null) return NotFound();

            process.Status = newStatus;
            await _context.SaveChangesAsync();
            return Ok(process);
        }
    }
}
