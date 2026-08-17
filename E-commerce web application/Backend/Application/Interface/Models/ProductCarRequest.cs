namespace Application.Models
{
    /// <summary>Datos necesarios para agregar, actualizar o identificar un producto dentro del carrito de un cliente.</summary>
    public class ProductCartRequest
    {
        /// <summary>ID del cliente dueño del carrito.</summary>
        public int ClientId { get; set; }
        /// <summary>ID del producto a agregar o actualizar en el carrito.</summary>
        public int ProductId { get; set; }
        /// <summary>Cantidad de unidades del producto.</summary>
        public int Amount { get; set; }
    }
}