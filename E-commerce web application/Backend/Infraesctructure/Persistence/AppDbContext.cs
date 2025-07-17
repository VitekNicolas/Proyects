using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infraesctructure.Persistence
{
    public class AppDbContext : DbContext
    {
        public DbSet<Client> Client { get; set; }
        public DbSet<Cart> Cart { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<ProductCart> ProductCart { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Client>(entity =>
            {
                entity.ToTable("Client");
                entity.HasKey(c => c.ClientId);
                entity.Property(t => t.DNI).HasColumnType("nvarchar(10)");
                entity.Property(t => t.FirstName).HasColumnType("nvarchar(25)");
                entity.Property(t => t.LastName).HasColumnType("nvarchar(25)");
                entity.Property(t => t.Address).HasColumnType("TEXT");
                entity.Property(t => t.PhoneNumber).HasColumnType("nvarchar(13)");
                entity.Property(t => t.ClientId).ValueGeneratedOnAdd();
                entity.HasData(
                    new Client
                    {
                        ClientId = 1,
                        FirstName = "Nicolas",
                        LastName = "Vitek",
                        DNI = 23344312,
                        Address = "Bynnon 2331",
                        PhoneNumber = "4234-1231"
                    });
                entity
                .HasMany<Cart>(cl => cl.Cart)
                .WithOne(c => c.Client);

            });
            modelBuilder.Entity<Product>().HasData(
            new
            {
                ProductId = 1,
                Name = "Alfajor",
                Description = "40 grm",
                Brand = "Sol Serrano",
                Code = "a-043",
                Price = 37.99,
                Image = "Http://static.cotodigital3.com.ar/sitios/fotos/full/00523500/00523588.jpg?3.0.138f",
            },
            new
            {
                ProductId = 2,
                Name = "Yerba mate",
                Description = "Edicion 1950, 1 kgrm",
                Brand = "Amanda",
                Code = "a-099",
                Price = 543.33,
                Image = "https://static.cotodigital3.com.ar/sitios/fotos/full/00510600/00510606.jpg?3.0.138f",
            },
            new
            {
                ProductId = 3,
                Name = "Pure de tomate",
                Description = "520 grm",
                Brand = "Corper",
                Code = "a-007",
                Price = 95.40,
                Image = "https://static.cotodigital3.com.ar/sitios/fotos/full/00263300/00263369.jpg?3.0.138f",
            },
            new
            {
                ProductId = 4,
                Name = "Cafe molido",
                Description = "20 grm",
                Brand = "La Virginia",
                Code = "a-211",
                Price = 388.15,
                Image = "https://static.cotodigital3.com.ar/sitios/fotos/full/00230100/00230124.jpg?3.0.138f",
            },
            new
            {
                ProductId = 5,
                Name = "Arvejas",
                Description = "Bajo en sodio, 340 grm",
                Brand = "Doña Pupa",
                Code = "a-055",
                Price = 65.39,
                Image = "https://static.cotodigital3.com.ar/sitios/fotos/full/00537400/00537472.jpg?3.0.138f",
            },
            new
            {
                ProductId = 6,
                Name = "Agua mineral",
                Description = "Sin gas, 2.5 lt",
                Brand = "Bonaqua",
                Code = "b-013",
                Price = 91.71,
                Image = "https://static.cotodigital3.com.ar/sitios/fotos/full/00289600/00289636.jpg?3.0.138f",
            },
            new
            {
                ProductId = 7,
                Name = "Gaseosa",
                Description = "Light, 2 lt",
                Brand = "Coca-Cola",
                Code = "b-020",
                Price = 134.55,
                Image = "https://static.cotodigital3.com.ar/sitios/fotos/full/00189500/00189594.jpg?3.0.138f",
            },
            new
            {
                ProductId = 8,
                Name = "Leche",
                Description = "Entera, sache 1 lt",
                Brand = "La Serenisima",
                Code = "f-103",
                Price = 183.25,
                Image = "https://static.cotodigital3.com.ar/sitios/fotos/full/00170500/00170599.jpg?3.0.138f",
            },
            new
            {
                ProductId = 9,
                Name = "Cookie Sandwich",
                Description = "Caja 160 grm",
                Brand = "Fudy",
                Code = "c-017",
                Price = 259.00,
                Image = "https://static.cotodigital3.com.ar/sitios/fotos/full/00499100/00499140.jpg?3.0.138f",
            },
            new
            {
                ProductId = 10,
                Name = "Pañuelos",
                Description = "Doble hoja, caja 100u",
                Brand = "Elite",
                Code = "l-022",
                Price = 149.87,
                Image = "https://static.cotodigital3.com.ar/sitios/fotos/full/00264600/00264677.jpg?3.0.138f",
            }
            );

            modelBuilder.Entity<Cart>(entity =>
            {
                entity.ToTable("Cart");
                entity.HasKey(c => c.CartId);
                entity.Property(c => c.CartId).ValueGeneratedOnAdd();
                entity.Property(c => c.Status).HasColumnType("bit");
                entity.HasOne<Order>(c => c.Order);
                entity
                .HasOne<Client>(c => c.Client)
                .WithMany(cl => cl.Cart)
                .HasForeignKey(c => c.ClientId);
                entity
                .HasOne<Order>(c => c.Order)
                .WithOne(o => o.Cart)
                .HasForeignKey<Order>(o => o.CartId);
            });
            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("Product");
                entity.HasKey(p => p.ProductId);
                entity.Property(p => p.ProductId).ValueGeneratedOnAdd();
                entity.Property(p => p.Name).HasColumnType("TEXT");
                entity.Property(p => p.Description).HasColumnType("TEXT");
                entity.Property(p => p.Brand).HasColumnType("nvarchar(25)");
                entity.Property(p => p.Code).HasColumnType("nvarchar(25)");
                entity.Property(p => p.Price).HasColumnType("decimal(15,2)");
                entity.Property(p => p.Image).HasColumnType("TEXT");
                entity
                .HasMany<ProductCart>(p => p.ProductCart)
                .WithOne(pc => pc.Product);
            });
            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("Order");
                entity.HasKey(o => o.OrderId);
                entity.Property(o => o.OrderId).ValueGeneratedOnAdd();
                entity.Property(o => o.Total).HasColumnType("decimal(15,2)");
                entity.Property(o => o.Date).HasColumnType("datetime");
            });
            modelBuilder.Entity<ProductCart>(entity =>
            {
                entity.ToTable("ProductCart");
                entity.HasKey(pc => new { pc.CartId, pc.ProductId });
                entity.Property(o => o.Amount).HasColumnType("int");
                entity
                .HasOne<Cart>(pc => pc.Cart)
                .WithMany(c => c.ProductCart)
                .HasForeignKey(pc => pc.CartId);
                entity
                .HasOne<Product>(pc => pc.Product)
                .WithMany(p => p.ProductCart)
                .HasForeignKey(pc => pc.ProductId);
            });
        }
    }
}
