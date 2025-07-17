using Application.Interface;
using Domain.Entities;
using Infraesctructure.Persistence;

namespace Infraesctructure.Command
{
    public class OrderCommand: IOrderCommand
    {
        private readonly AppDbContext _context;

        public OrderCommand(AppDbContext context)
        {
            _context = context;
        }
        public async Task InsertOrder(Order order)
        {
        _context.Add(order);
        await _context.SaveChangesAsync();
        }
    }
}