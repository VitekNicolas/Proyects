using _TP1_ORM_Vitek_Nicolas_.Persistence;

namespace TP1_ORM_Vitek_Nicolas.Query
{
    public class SalesQuery
    {
        public List<SalesData> GetList()
        {
            using (var context = new AppDbContext())
            {
                var query = from cl in context.Cliente
                            join c in context.Carrito on cl.ClienteId equals c.ClienteId
                            join o in context.Orden on c.CarritoId equals o.CarritoId
                            join cp in context.CarritoProducto on c.CarritoId equals cp.CarritoId
                            join p in context.Producto on cp.ProductoId equals p.ProductoId
                            select new SalesData
                            {
                                NombreCliente = cl.Nombre,
                                ApellidoCliente = cl.Apellido,
                                NombreProducto = p.Nombre,
                                PrecioProducto = p.Precio,
                                CantidadProducto = cp.Cantidad,
                                FechaOrden = o.Fecha,
                                ProductoId = p.ProductoId
                            };
                return query.ToList();
            }
        }
        public override string ToString()
        {
            string text = "";
            foreach (SalesData data in GetList())
            {
                text = text + "El cliente " + data.NombreCliente + " "+ data.ApellidoCliente + " compro "+ data.CantidadProducto + " unidad/es de " + data.NombreProducto+ " (Id: "+ data.ProductoId+ ")"+ " a $"+ data.PrecioProducto + " el dia "+ data.FechaOrden + "\n";
            }
            return text;
        }
    }
}