namespace _TP1_ORM_Vitek_Nicolas_.Entities
{
    public class CarritoProducto
    {
        public CarritoProducto(Guid carritoId, int productoId, int cantidad)
        {
            CarritoId = carritoId;
            ProductoId = productoId;
            Cantidad = cantidad;
        }
        public Guid CarritoId { get; set; }
        public int ProductoId { get; set; }
        public int Cantidad { get; set; }
        public Carrito Carrito { get; set; }
        public Producto Producto { get; set; }
    }
}
