using _TP1_ORM_Vitek_Nicolas_.Persistence;

namespace TP1_ORM_Vitek_Nicolas.Menu.Add_sale
{
    public  class ShowProducts
    {
        public void Display()
        {
            Console.WriteLine("Lista de productos");
            using (var context = new AppDbContext())
            {
                var products = context.Producto.ToList();
                foreach (var product in products)
                {
                    Console.WriteLine("{0} {1} ${2}", product.ProductoId, product.Nombre, product.Precio);
                }
            }
        }
    }
}