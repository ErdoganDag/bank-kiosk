namespace BankApi.Models
{
    public class Button
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public ICollection<Category>? Categories { get; set; }
    }

}
