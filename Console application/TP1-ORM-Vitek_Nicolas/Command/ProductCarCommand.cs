using _TP1_ORM_Vitek_Nicolas_.Entities;
using _TP1_ORM_Vitek_Nicolas_.Interface;
using _TP1_ORM_Vitek_Nicolas_.Persistence;

namespace _TP1_ORM_Vitek_Nicolas_.Command
{
    public class ProductCarCommand : IProductCarCommand
    {
        private readonly AppDbContext _context;

        public ProductCarCommand(AppDbContext context)
        {
            _context = context;
        }

        public void InsertProductCar(CarritoProducto productCar)
        {
            _context.Add(productCar);
            _context.SaveChanges();
        }
    }
}
