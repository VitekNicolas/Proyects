
namespace Application.UserCase.Product
{
    public class ProductData
    {
        public ProductData() { }
        public ProductData(int id, int cantidad, double precio)
        {
            Id = id;
            Amount = cantidad;
            Price = precio;
        }

        public int Id { get; set; }
        public int Amount { get; set; }
        public double Price { get; set; }
    }
}
