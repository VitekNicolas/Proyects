using Application.Interface;
using Domain.Entities;
using Infraesctructure.Persistence;

namespace Infraesctructure.Command
{
    public class ProductCartCommand(AppDbContext context) : IProductCartCommand
    {
        private readonly AppDbContext _context = context;

        public async Task InsertProductCart(ProductCart productCart)
        {
            Console.WriteLine($"CartId: {productCart.CartId}");
            Console.WriteLine($"ProductId: {productCart.ProductId}");
            _context.Add(productCart);
            await _context.SaveChangesAsync();
        }

        // ProductCartCommand.cs
        public async Task DeletedProductCart(ProductCart productCart)
        {
            var tracked = await _context.ProductCart.FindAsync(
                productCart.CartId,
                productCart.ProductId
            );
            if (tracked != null)
            {
                _context.Remove(tracked);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateProductCart(ProductCart productCart)
        {
            var tracked = await _context.ProductCart.FindAsync(
                productCart.CartId,
                productCart.ProductId
            );
            if (tracked != null)
            {
                tracked.Amount = productCart.Amount;
                await _context.SaveChangesAsync();
            }
        }
    }
}
