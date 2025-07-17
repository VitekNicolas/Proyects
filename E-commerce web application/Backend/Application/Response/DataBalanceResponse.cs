namespace Application.Response
{
    public class DataBalanceResponse
    {
        public string? FirstNameClient { get; set; }
        public string? LastNameClient { get; set; }
        public double? Total { get; set; }
        public double? SubTotal { get; set; }
        public string? ProductName { get; set; }
        public int? ProductAmount { get; set; }
        public double? ProductPrice { get; set; }
    }
}