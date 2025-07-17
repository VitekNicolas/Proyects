namespace Application.Models
{
    public class ProductCartRequest
    {
        public int ClientId { get; set; }
        public int ProductId { get; set; }
        public int Amount { get; set; }
    }
}