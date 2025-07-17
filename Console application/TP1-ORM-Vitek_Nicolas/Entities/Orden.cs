
namespace _TP1_ORM_Vitek_Nicolas_.Entities
{
    public class Orden
    {
        public Orden(Guid carritoId, DateTime fecha, double total)
        {
            CarritoId = carritoId;
            Fecha = fecha;
            Total = total;
        }
        public Guid OrdenId { get; set; }
        public Guid CarritoId { get; set; }
        public DateTime Fecha { get; set; }
        public double Total { get; set; }
        public Carrito Carrito { get; set; }
    }
}
