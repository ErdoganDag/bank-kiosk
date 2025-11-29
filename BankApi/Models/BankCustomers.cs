namespace BankApi.Models
{
    
    public class BankCustomer
    {
        public int BankCustomerId { get; set; }
        public int? CustomerNumber { get; set; }
        public string? Tckn { get; set; }
        public string? Vkn { get; set; }
        public string? Mobile { get; set; }
        public string? Cardno { get; set; }
        public string? Ykn { get; set; }
        public string? Isim { get; set; }
        public DateTime? DogumTarihi { get; set; }
        public int? SahipSube { get; set; }
        public int? KilavuzSube { get; set; }
        public string? MusteriTipi { get; set; }
        public int? Segment { get; set; }
        public bool? Cinsiyet { get; set; }
        public string? Meslek { get; set; }
        public bool? KvkDurum { get; set; }
        public bool? KvkIzni { get; set; }
        public bool? EngelDurumu { get; set; }
        public string? Mesaj { get; set; }
    }
}
