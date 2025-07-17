using _TP1_ORM_Vitek_Nicolas_.Entities;
using _TP1_ORM_Vitek_Nicolas_.Interface;
using _TP1_ORM_Vitek_Nicolas_.Persistence;

namespace _TP1_ORM_Vitek_Nicolas_.Command
{
    public class CarCommand : ICarCommand
    {
        private readonly AppDbContext _context;

        public CarCommand(AppDbContext context)
        {
            _context = context;
        }

        public void InsertCar(Carrito car)
        {
            _context.Add(car);
            _context.SaveChanges();
        }
    }
}
