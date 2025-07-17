
using Application.Interface;
using Domain.Entities;
using Infraesctructure.Persistence;

namespace Infraesctructure.Query
{
    public class ClientQuery : IClientQuery
    {
        private readonly AppDbContext _context;

        public ClientQuery(AppDbContext context)
        {
            _context = context;
        }
        public Client? GetClient(int id)
        {
            var client = _context.Client
                .FirstOrDefault(c => c.ClientId == id);
            return client;
        }
        public bool DuplicateDni(int dni)
        {
            List<Client> list;
            var query = from cl in _context.Client
                        where cl.DNI == dni
                        select cl;
            list = [.. query];

            if (list.Count == 0)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    }
}