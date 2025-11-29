using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BankApi.Data;
using BankApi.Models;
namespace BankApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BankCustomersController : ControllerBase
    {
        private readonly BankDbContext _context;

        public BankCustomersController(BankDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            // Basit örnek: TCKN ve doğum tarihine göre giriş kontrolü
            var user = await _context.BankCustomers
                .FirstOrDefaultAsync(x => x.Tckn == request.Tckn && x.DogumTarihi == request.DogumTarihi);

            if (user == null)
                return Unauthorized(new { message = "TCKN veya Doğum Tarihi hatalı" });

            return Ok(new { message = "Giriş başarılı", name = user.Isim });
        }

        // Model sınıfı
        public class LoginRequest
        {
            public string Tckn { get; set; }
            public DateTime DogumTarihi { get; set; }
        }

        // GET: api/bankcustomers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BankCustomer>>> GetCustomers()
        {
            return await _context.BankCustomers.ToListAsync();
        }

        // GET: api/bankcustomers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BankCustomer>> GetCustomer(int id)
        {
            var customer = await _context.BankCustomers.FindAsync(id);
            if (customer == null) return NotFound();
            return customer;
        }

        // POST: api/bankcustomers
        [HttpPost]
        public async Task<ActionResult<BankCustomer>> PostCustomer(BankCustomer customer)
        {
            _context.BankCustomers.Add(customer);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCustomer), new { id = customer.BankCustomerId }, customer);
        }

        // PUT: api/bankcustomers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, BankCustomer customer)
        {
            if (id != customer.BankCustomerId) return BadRequest();

            _context.Entry(customer).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/bankcustomers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _context.BankCustomers.FindAsync(id);
            if (customer == null) return NotFound();

            _context.BankCustomers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}