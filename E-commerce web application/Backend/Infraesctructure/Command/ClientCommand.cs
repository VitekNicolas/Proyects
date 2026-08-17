using Application.Interface;
using Domain.Entities;
using Infraesctructure.Persistence;

namespace Infraesctructure.Command
{
    public class ClientCommand(AppDbContext context) : IClientCommand
    {
        private readonly AppDbContext _context = context;

        public async Task InsertClient(Client cliente)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            _context.Add(cliente);
            await _context.SaveChangesAsync();
            var cart = new Cart(cliente.ClientId, true);
            _context.Add(cart);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
        }
    }
}