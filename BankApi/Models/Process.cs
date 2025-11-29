namespace BankApi.Models
{
    public class Process
    {
        public int Id { get; set; }
        public int TicketId { get; set; }
        public int CategoryId { get; set; }
        public string Status { get; set; } = "Bekliyor"; // Bekliyor | Çağrıldı | Tamamlandı | İptal
        public string? CounterName { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? StartedAt { get; set; }
        public DateTime? CompletedAt { get; set; }

        public Ticket? Ticket { get; set; }
        public Category? Category { get; set; }
    }

}
