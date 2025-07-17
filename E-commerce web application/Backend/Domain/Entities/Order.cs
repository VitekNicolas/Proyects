using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class Order
    {
        [Column("orderId")]
        public int OrderId { get; set; }
        [Column("cartId")]
        public int CartId { get; set; }
        [Column("date")]
        public DateTime Date { get; set; }
        [Column("total")]
        public double Total { get; set; }
        public Cart? Cart { get; set; }
    }
}