using Application.Interface.Models;
using Domain.Entities;

namespace Application.Interface
{
    public interface IProductCartService
    {
        Task<ProductCart> CreateProductCart(int clientId, ProductCartRequest request);
        Task<ProductCart> UpdateProductCart(int clientId, ProductCartRequest request);
        Task<ProductCart> DeleteProductCart(int clientId, int productId);
    }
}
