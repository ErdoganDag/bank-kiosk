using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BankApi.Data;
using BankApi.Models;

namespace BankApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ButtonsController : ControllerBase
    {
        private readonly BankDbContext _context;

        public ButtonsController(BankDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetButtons()
        {
            var buttons = await _context.Buttons.Include(b => b.Categories).ToListAsync();
            return Ok(buttons);
        }
    }
}
