namespace Application.Interface.Models
{
    /// <summary>Datos necesarios para agregar o actualizar un producto dentro del carrito del cliente autenticado.</summary>
    public class ProductCartRequest
    {
        /// <summary>ID del producto a agregar o actualizar en el carrito.</summary>
        public int ProductId { get; set; }
        /// <summary>Cantidad de unidades del producto.</summary>
        public int Amount { get; set; }
    }
}