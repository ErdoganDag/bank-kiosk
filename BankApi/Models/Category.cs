namespace BankApi.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int ButtonId { get; set; }

        public Button? Button { get; set; }
        public ICollection<Ticket>? Tickets { get; set; }
    }

}
