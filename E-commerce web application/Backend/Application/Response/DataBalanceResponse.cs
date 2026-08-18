namespace Application.Response
{
    public class DataBalanceResponse
    {
        public int OrderId { get; set; }
        public DateTime Date { get; set; }
        public string? FirstNameClient { get; set; }
        public string? LastNameClient { get; set; }
        public string? ProductName { get; set; }
        public int ProductAmount { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Total { get; set; }
        public decimal ProductPrice { get; set; }
    }
}