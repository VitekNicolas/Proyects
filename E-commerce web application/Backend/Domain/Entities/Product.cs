using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class Product
    {
        [Column("productId")]
        public int ProductId { get; set; }
        [Column("name")]
        public string? Name { get; set; }
        [Column("description")]
        public string? Description { get; set; }
        [Column("brand")]
        public string? Brand { get; set; }
        [Column("code")]
        public string? Code { get; set; }
        [Column("price")]
        public double Price { get; set; }
        [Column("image")]
        public string? Image { get; set; }
        public ICollection<ProductCart>? ProductCart { get; set; }
    }
}

