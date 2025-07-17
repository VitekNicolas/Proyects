using Application.Models;
using Domain.Entities;

namespace Application.Interface
{
    public interface IProductCartService
    {
        Task<ProductCart> CreateProductCart(ProductCartRequest request);
        Task<ProductCart> UpdateProductCart(ProductCartRequest request);
        public Task<ProductCart> DeleteProductCart(int clientId, int productId);
    }
}
