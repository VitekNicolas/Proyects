using Application.Interface;
using Application.Models;
using Domain.Entities;

namespace Application.UserCase.cart
{
    public class ProductCartService : IProductCartService
    {
        private readonly IProductCartQuery _query;
        private readonly IProductCartCommand _command;
        private readonly ICartQuery _carQuery;

        public ProductCartService(IProductCartQuery query, IProductCartCommand command, ICartQuery carQuery)
        {
            _query = query;
            _command = command;
            _carQuery = carQuery;
        }
        public async Task<ProductCart> CreateProductCart(ProductCartRequest request)
        {
            int cartId = _carQuery.GetCartId(request.ClientId);
            if (cartId == null)
            {
                throw new NonExistentIDException();
            }
            var productCart = new ProductCart
            {
                CartId = cartId,
                ProductId = request.ProductId,
                Amount = request.Amount,
            };
            await _command.InsertProductCart(productCart);
            return productCart;
        }
        public async Task<ProductCart> DeleteProductCart(int clientId, int productId)
        {
            var productCart = _query.GetProductCart(clientId, productId);
            if (productCart == null)
            {
                throw new NonExistentIDException();
            }
            await _command.DeletedProductCart(productCart);
            return productCart;
        }

        public async Task<ProductCart> UpdateProductCart(ProductCartRequest request)
        {
            int cartId = _carQuery.GetCartId(request.ClientId);
            if (cartId == null)
            {
                throw new NonExistentIDException();
            }
            var productCart = new ProductCart
            {
                CartId = cartId,
                ProductId = request.ProductId,
                Amount = request.Amount,
            };
            await _command.UpdateProductCart(productCart);
            return productCart;
        }
    }
}