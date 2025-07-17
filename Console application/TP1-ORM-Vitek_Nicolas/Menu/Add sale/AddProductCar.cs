using _TP1_ORM_Vitek_Nicolas_.Command;
using _TP1_ORM_Vitek_Nicolas_.Entities;
using _TP1_ORM_Vitek_Nicolas_.Interface;
using _TP1_ORM_Vitek_Nicolas_.Persistence;
using _TP1_ORM_Vitek_Nicolas_.Services;
using System.Collections;

namespace TP1_ORM_Vitek_Nicolas.Menu.Add_sale
{
    public class AddProductCar
    {
        public void Ejecute(ArrayList list, Carrito car)
        {
            using (var context = new AppDbContext())
            {
                IProductCarCommand productCarCommand = new ProductCarCommand(context);
                IOrderCommand orderCommand = new OrderCommand(context);
                ICarService carService = new CarService(productCarCommand, list, car);
                carService.CreateProductCar();
                IOrderService orderService = new OrderService(orderCommand, car, list);
                orderService.CreateOrder();
            }
        }
    }
}
