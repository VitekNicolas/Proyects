using _TP1_ORM_Vitek_Nicolas_.Persistence;

namespace TP1_ORM_Vitek_Nicolas.Query
{
    public class ProductQuery
    {
        public List<SalesData> GetList()
        {            
            using (var context = new AppDbContext())
            {
                var query = from p in context.Producto
                        join cp in context.CarritoProducto on p.ProductoId equals cp.ProductoId
                        join c in context.Carrito on cp.CarritoId equals c.CarritoId
                        join o in context.Orden on c.CarritoId equals o.CarritoId
                        select new SalesData
                        {
                            NombreProducto = p.Nombre,
                            PrecioProducto = p.Precio,
                            CantidadProducto = cp.Cantidad,
                            FechaOrden = o.Fecha,
                            ProductoId = p.ProductoId
                        };
                return query.ToList();
            }
        }
        public string SearchInList(int id)
        {
            int cant = 0;
            string name="";
            string result = "";
            foreach (SalesData product in GetList())
            {
                if (product.ProductoId == id)
                {
                    cant = cant + product.CantidadProducto;
                    name = product.NombreProducto;
                }
            }
            result = "Se vendieron " + cant + " unidad/es de " + name;
            return result;
        }
    }
}