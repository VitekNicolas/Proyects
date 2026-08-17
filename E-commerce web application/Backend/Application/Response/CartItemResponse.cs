namespace Application.Response
{
    public class CartItemResponse
    {
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public decimal Price { get; set; }
        public int Amount { get; set; }
        public decimal SubTotal { get; set; }
    }
}