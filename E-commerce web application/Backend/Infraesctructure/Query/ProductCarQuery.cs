using Application.Interface;
using Application.Response;
using Domain.Entities;
using Infraesctructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infraesctructure.Query
{
    public class ProductCartQuery(AppDbContext context) : IProductCartQuery
    {
        private readonly AppDbContext _context = context;

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

        public async Task<List<CartItemResponse>> GetCartItems(int clientId)
        {
            var query = from c in _context.Cart
                        where c.ClientId == clientId && c.Status
                        join cp in _context.ProductCart on c.CartId equals cp.CartId
                        join p in _context.Product on cp.ProductId equals p.ProductId
                        select new CartItemResponse
                        {
                            ProductId = p.ProductId,
                            ProductName = p.Name,
                            Price = p.Price,
                            Amount = cp.Amount,
                            SubTotal = p.Price * cp.Amount
                        };
            return await query.ToListAsync();
        }
    }
}