using Microsoft.AspNetCore.Mvc;
using BankApi.Data;
using BankApi.Models;
using System.Linq;

namespace BankApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly BankDbContext _context;

        public LoginController(BankDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // 🧩 1. Girdi kontrolü
            if (request == null || string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Sifre))
                return BadRequest(new { message = "E-posta ve şifre boş olamaz." });

            // 🧩 2. Veritabanında kullanıcıyı ara
            var user = _context.Users
                .FirstOrDefault(u => u.Email == request.Email && u.Sifre == request.Sifre);

            // 🧩 3. Kullanıcı bulunamadıysa hata dön
            if (user == null)
                return Unauthorized(new { message = "E-posta veya şifre hatalı." });

            // 🧩 4. Başarılı giriş
            return Ok(new
            {
                message = "Giriş başarılı",
                user = new
                {
                    user.UserId,
                    user.Ad,
                    user.Soyad,
                    user.Email
                }
            });
        }
    }   
}
