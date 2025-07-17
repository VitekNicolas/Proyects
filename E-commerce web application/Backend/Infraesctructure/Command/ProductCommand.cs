
using Application.Interface;
using Domain.Entities;
using Infraesctructure.Persistence;

namespace Infraesctructure.Command
{
    public class ProductCommand : IProductCommand
    {
        private readonly AppDbContext _context;

        public ProductCommand(AppDbContext context)
        {
            _context = context;
        }

        public async Task Delete(Product product)
        {
            _context.Remove(product);
            await _context.SaveChangesAsync();
        }
    }
}
