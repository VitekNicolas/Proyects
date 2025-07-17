using _TP1_ORM_Vitek_Nicolas_.Entities;
using _TP1_ORM_Vitek_Nicolas_.Interface;
using _TP1_ORM_Vitek_Nicolas_.Persistence;

namespace _TP1_ORM_Vitek_Nicolas_.Command
{
    public class OrderCommand : IOrderCommand
    {
        private readonly AppDbContext _context;

        public OrderCommand(AppDbContext context)
        {
            _context = context;
        }

        public void InsertOrder(Orden order)
        {
            _context.Add(order);
            _context.SaveChanges();
        }
    }
}
