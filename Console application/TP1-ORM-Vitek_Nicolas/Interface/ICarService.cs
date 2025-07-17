using _TP1_ORM_Vitek_Nicolas_.Entities;

namespace _TP1_ORM_Vitek_Nicolas_.Interface
{
    interface ICarService
    {
        public void CreateCar(int id);
        public void CreateProductCar();
        public Carrito GetCar();
    }
}
