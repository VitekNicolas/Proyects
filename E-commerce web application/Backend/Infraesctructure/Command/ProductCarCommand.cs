using Application.Interface;
using Domain.Entities;
using Infraesctructure.Persistence;

namespace Infraesctructure.Command
{
    public class ProductCartCommand:IProductCartCommand
    {
        private readonly AppDbContext _context;

        public ProductCartCommand(AppDbContext context)
        {
            _context = context;
        }
        public async Task InsertProductCart(ProductCart productCart)
        {
            _context.Add(productCart);
            await _context.SaveChangesAsync();
        }
        public async Task DeletedProductCart(ProductCart productCart)
        {
            _context.Remove(productCart);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateProductCart(ProductCart productCart)
        {
            _context.Update(productCart);
            await _context.SaveChangesAsync();
        }
    }
}