using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BankApi.Data;
using BankApi.Models;

namespace BankApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly BankDbContext _context;

        public CategoriesController(BankDbContext context)
        {
            _context = context;
        }

        [HttpGet("{buttonId}")]
        public async Task<IActionResult> GetCategoriesByButton(int buttonId)
        {
            var categories = await _context.Categories
                .Where(c => c.ButtonId == buttonId)
                .ToListAsync();

            return Ok(categories);
        }
    }
}
