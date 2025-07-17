using _TP1_ORM_Vitek_Nicolas_.Entities;
using _TP1_ORM_Vitek_Nicolas_.Interface;
using System.Collections;

namespace _TP1_ORM_Vitek_Nicolas_.Services
{
    public class CarService : ICarService
    {
        private readonly ICarCommand _comandForCar;
        private readonly IProductCarCommand _commandForProductCar;
        
        private ArrayList _list;
        private Carrito _car;
        private CarritoProducto _productCar;

        public CarService(ICarCommand comandForCar)
        {
            _comandForCar = comandForCar;
        }

        public CarService(IProductCarCommand commandForProductCar, ArrayList list, Carrito car)
        {
            _commandForProductCar = commandForProductCar;
            _list = list;
            _car = car;
        }

        public void CreateCar(int id)
        {
            _car = new Carrito(id, true);
            _comandForCar.InsertCar(_car);
        }

        public void CreateProductCar()
        {
            foreach (ProductData product in _list)
            {
                _productCar = new CarritoProducto(_car.CarritoId,product.Id, product.Cantidad);
                _commandForProductCar.InsertProductCar(_productCar);
            }
        }
        public Carrito GetCar()
        {
            return _car;
        }
    }
}