using _TP1_ORM_Vitek_Nicolas_.Command;
using _TP1_ORM_Vitek_Nicolas_.Entities;
using _TP1_ORM_Vitek_Nicolas_.Interface;
using _TP1_ORM_Vitek_Nicolas_.Persistence;
using _TP1_ORM_Vitek_Nicolas_.Services;

namespace TP1_ORM_Vitek_Nicolas.Menu.Add_sale
{
    public class AddCar
    {
        Carrito car;
        public void Ejecute(int clientId)
        {
            using (var context = new AppDbContext())
            {
                ICarCommand carCommand = new CarCommand(context);
                ICarService carService = new CarService(carCommand);
                carService.CreateCar(clientId);
                car = carService.GetCar();
            }
        }
        public Carrito GetCar()
        {
            return car;
        }
    }
}