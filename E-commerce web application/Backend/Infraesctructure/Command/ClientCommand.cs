using Application.Interface;
using Domain.Entities;
using Infraesctructure.Persistence;

namespace Infraesctructure.Command
{
    public class ClientCommand: IClientCommand
    {
        private readonly AppDbContext _context;

        public ClientCommand(AppDbContext context)
        {
            _context = context;
        }
        public async Task InsertClient(Client cliente)
        {
            _context.Add(cliente);
            await _context.SaveChangesAsync();
        }
    }
}