using System.Diagnostics;

namespace BankApi.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public int TicketNumber { get; set; }
        public int CategoryId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public Category? Category { get; set; }
        public Process? Process { get; set; }
    }

}
