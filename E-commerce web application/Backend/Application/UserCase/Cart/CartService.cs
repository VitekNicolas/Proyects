using Application.Exceptions;
using Application.Interface;
using Application.Response;

namespace Application.UserCase
{
    public class CartService(ICartQuery cartQuery, IProductCartQuery productCartQuery) : ICartService
    {
        private readonly ICartQuery _cartQuery = cartQuery;
        private readonly IProductCartQuery _productCartQuery = productCartQuery;

        public async Task<CartResponse> GetMyCart(int clientId)
        {
            int? cartId = _cartQuery.GetCartId(clientId) ?? throw new NonExistentIDException();
            var items = await _productCartQuery.GetCartItems(clientId);

            return new CartResponse
            {
                CartId = cartId.Value,
                Items = items,
                Total = items.Sum(i => i.SubTotal)
            };
        }
    }
}