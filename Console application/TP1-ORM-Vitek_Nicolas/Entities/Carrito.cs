namespace _TP1_ORM_Vitek_Nicolas_.Entities
{
    public class Carrito
    {
        public Carrito(int clienteId, bool estado)
        {
            ClienteId = clienteId;
            Estado = estado;
        }
        public Guid CarritoId { get; set; }
        public int ClienteId { get; set; }
        public bool Estado { get; set; }
        public Cliente Cliente { get; set; }
        public Orden Orden { get; set; }
        public ICollection<CarritoProducto> CarritoProducto { get; set; }
    }
}
