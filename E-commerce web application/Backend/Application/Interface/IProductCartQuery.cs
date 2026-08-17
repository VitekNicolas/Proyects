using Application.Response;
using Domain.Entities;

namespace Application.Interface
{
    public interface IProductCartQuery
    {
        public ProductCart? GetProductCart(int clientId, int productId);
        public Task<List<CartItemResponse>> GetCartItems(int clientId);
    }
}
