using Domain.Entities;

namespace Application.Interface
{
    public interface IProductCartQuery
    {
        public ProductCart? GetProductCart(int clientId, int productId);
    }
}
