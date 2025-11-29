using BankApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BankApi.Data
{
    public class BankDbContext : DbContext
    {
        public BankDbContext(DbContextOptions<BankDbContext> options) : base(options) { }

        // 🧾 Tablolar
        public DbSet<BankCustomer> BankCustomers { get; set; }
        public DbSet<User> Users { get; set; }

        // 🔢 Numaratör Sistemi
        public DbSet<Button> Buttons { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Process> Processes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // 👤 User tablosunda email benzersiz olsun
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // 🔗 Button - Category ilişkisi (1 butonun birden çok kategorisi olabilir)
            modelBuilder.Entity<Category>()
                .HasOne(c => c.Button)
                .WithMany(b => b.Categories)
                .HasForeignKey(c => c.ButtonId)
                .OnDelete(DeleteBehavior.Cascade);

            // 🔗 Category - Ticket ilişkisi (1 kategoriye ait birçok ticket olabilir)
            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Category)
                .WithMany(c => c.Tickets)
                .HasForeignKey(t => t.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);

            // 🔗 Ticket - Process ilişkisi (1 ticket’a bağlı birden fazla işlem olabilir)
            modelBuilder.Entity<Process>()
                .HasOne(p => p.Ticket)
                .WithMany(t => t.Process)
                .HasForeignKey(p => p.TicketId)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }
    }
}
