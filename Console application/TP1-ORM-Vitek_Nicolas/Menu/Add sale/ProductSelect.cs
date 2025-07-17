using _TP1_ORM_Vitek_Nicolas_.Entities;
using _TP1_ORM_Vitek_Nicolas_.Exceptions;
using _TP1_ORM_Vitek_Nicolas_.Persistence;
using System.Collections;
using TP1_ORM_Vitek_Nicolas.Menu.Add_sale;

namespace _TP1_ORM_Vitek_Nicolas_.Menu
{
    public class ProductSelect
    {
        public ArrayList _list;
        private ProductData _productData;
        public void AskProductSelect()
        {
            _list = new ArrayList();
            while (true)
            {
                try
                {
                    Console.Clear();
                    new ShowProducts().Display();
                    Console.WriteLine("Elija los productos ingresando su numero");
                    int productoId = int.Parse(Console.ReadLine());
                    if (productoId<1 ^ productoId >10)
                    {
                        throw new WrongProductId();
                    }
                    Console.WriteLine("Elija la cantidad");
                    int cantidad = int.Parse(Console.ReadLine());
                    double precio;
                    using (var context = new AppDbContext())
                    {
                        var query = from p in context.Producto
                                    where p.ProductoId == productoId
                                    select p;
                        precio = query.FirstOrDefault<Producto>().Precio;
                    }
                    _productData = new ProductData(productoId, cantidad, precio);

                    _list.Add(_productData);
                    Console.WriteLine("Pulse 1 para volver al menu principal o 2 para comprar otro producto");
                    string option = Console.ReadLine();
                    if (option == "1")
                    {
                        break;
                    }
                    if (option == "2")
                    {
                        continue;
                    }
                }
                catch (WrongProductId e)
                {
                    Console.WriteLine(e.Message);
                    Console.ReadKey(true);
                }
                catch (FormatException)
                {
                    Console.WriteLine("Debe ingresar un ID del producto. Presione una tecla para volver atras ");
                    Console.ReadKey(true);
                }
            }
        }
        public ArrayList GetList()
        {
            return _list;
        }
    }
}