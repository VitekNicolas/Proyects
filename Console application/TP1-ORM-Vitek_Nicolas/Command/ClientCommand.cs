using _TP1_ORM_Vitek_Nicolas_.Entities;
using _TP1_ORM_Vitek_Nicolas_.Interface;
using _TP1_ORM_Vitek_Nicolas_.Persistence;

namespace _TP1_ORM_Vitek_Nicolas_.Command
{
    public class ClientCommand: IClientCommand
    {
        private readonly AppDbContext _context;

        public ClientCommand(AppDbContext context)
        {
            _context = context;
        }
        public void InsertClient(Cliente cliente)
        {
            _context.Add(cliente);
            _context.SaveChanges();
        }
    }
}
