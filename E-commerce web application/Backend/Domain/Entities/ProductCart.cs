using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class ProductCart
    {   
        [Column("cartId")]
        public int CartId { get; set; }
        [Column("productId")]
        public int ProductId { get; set; }
        [Column("amount")]
        public int Amount { get; set; }
        public Cart? Cart { get; set; }
        public Product? Product { get; set; }
    }
}
