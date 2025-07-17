using Application.Interface;
using Domain.Entities;
using Infraesctructure.Persistence;

namespace Infraesctructure.Query
{
    public class ProductCartQuery : IProductCartQuery
    {
        private readonly AppDbContext _context;

        public ProductCartQuery(AppDbContext context)
        {
            _context = context;
        }
        public ProductCart? GetProductCart(int clientId, int productId)
        {
            var productCart = from c in _context.Cart
                              where c.ClientId == clientId
                              join cp in _context.ProductCart on c.CartId equals cp.CartId
                              where cp.ProductId == productId
                              select new ProductCart
                              {
                                  CartId = cp.CartId,
                                  ProductId = cp.ProductId,
                                  Amount = cp.Amount
                              };
            return productCart.FirstOrDefault();
        }
    }
}
