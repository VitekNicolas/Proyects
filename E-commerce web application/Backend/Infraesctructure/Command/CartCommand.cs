using Application.Interface;
using Domain.Entities;
using Infraesctructure.Persistence;

namespace Infraesctructure.Command
{
    public class CartCommand:ICartCommand
    {
        private readonly AppDbContext _context;

        public CartCommand(AppDbContext context)
        {
            _context = context;
        }

        public async Task InsertCart(Cart cart)
        {
            _context.Add(cart);
            await _context.SaveChangesAsync();
        }
    }
}