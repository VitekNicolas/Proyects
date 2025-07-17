using _TP1_ORM_Vitek_Nicolas_.Entities;
using _TP1_ORM_Vitek_Nicolas_.Interface;
using System.Collections;

namespace _TP1_ORM_Vitek_Nicolas_.Services
{
    public class OrderService : IOrderService
    {
        private IOrderCommand _command;
        private Carrito _car;
        private ArrayList _list;
        private double _total = 0;

        public OrderService(IOrderCommand command, Carrito car, ArrayList list)
        {
            _command = command;
            _car = car;
            _list = list;
        }

        public void CreateOrder()
        {
            foreach (ProductData item in _list)
            {
                _total = _total + (item.Cantidad * item.Precio);
            }
            Orden order = new Orden(_car.CarritoId,DateTime.Now, _total);
            _command.InsertOrder(order);
            Console.WriteLine("El total de la compra fue {0}", _total);
            Console.ReadKey();
        }
    }
}