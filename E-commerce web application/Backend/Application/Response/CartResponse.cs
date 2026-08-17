namespace Application.Response
{
    public class CartResponse
    {
        public int CartId { get; set; }
        public List<CartItemResponse> Items { get; set; } = new();
        public decimal Total { get; set; }
    }
}