using Application.Exceptions;
using Application.Interface;
using Application.Models;
using Domain.Entities;

namespace Application.UserCase.cart
{
    public class ProductCartService(IProductCartQuery query, IProductCartCommand command, ICartQuery carQuery) : IProductCartService
    {
        private readonly IProductCartQuery _query = query;
        private readonly IProductCartCommand _command = command;
        private readonly ICartQuery _carQuery = carQuery;

        public async Task<ProductCart> CreateProductCart(ProductCartRequest request)
        {
            int? cartId = _carQuery.GetCartId(request.ClientId) ?? throw new NonExistentIDException();
            var productCart = new ProductCart
            {
                CartId = cartId.Value,
                ProductId = request.ProductId,
                Amount = request.Amount,
            };
            await _command.InsertProductCart(productCart);
            return productCart;
        }
        public async Task<ProductCart> DeleteProductCart(int clientId, int productId)
        {
            var productCart = _query.GetProductCart(clientId, productId) ?? throw new NonExistentIDException();
            await _command.DeletedProductCart(productCart);
            return productCart;
        }

        public async Task<ProductCart> UpdateProductCart(ProductCartRequest request)
        {
            int? cartId = _carQuery.GetCartId(request.ClientId) ?? throw new NonExistentIDException();
            var productCart = new ProductCart
            {
                CartId = cartId.Value,
                ProductId = request.ProductId,
                Amount = request.Amount,
            };
            await _command.UpdateProductCart(productCart);
            return productCart;
        }
    }
}