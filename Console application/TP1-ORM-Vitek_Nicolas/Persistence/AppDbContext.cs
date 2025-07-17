using _TP1_ORM_Vitek_Nicolas_.Entities;
using Microsoft.EntityFrameworkCore;

namespace _TP1_ORM_Vitek_Nicolas_.Persistence
{
    public class AppDbContext : DbContext
    {
        public DbSet<Cliente> Cliente { get; set; }
        public DbSet<Carrito> Carrito { get; set; }
        public DbSet<Orden> Orden { get; set; }
        public DbSet<Producto> Producto { get; set; }
        public DbSet<CarritoProducto> CarritoProducto { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=DESKTOP-NJ99FH2\SQLEXPRESS;Database=NicolasVitek;Trusted_Connection=True;");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.ToTable("Cliente");
                entity.HasKey(c => c.ClienteId);
                entity.Property(t => t.DNI).HasColumnType("nvarchar(10)");
                entity.Property(t => t.Nombre).HasColumnType("nvarchar(25)");
                entity.Property(t => t.Apellido).HasColumnType("nvarchar(25)");
                entity.Property(t => t.Direccion).HasColumnType("nvarchar(MAX)");
                entity.Property(t => t.Telefono).HasColumnType("nvarchar(13)");
                entity.Property(t => t.ClienteId).ValueGeneratedOnAdd();
                entity.HasData(
                    new Cliente
                    {
                        ClienteId = 1,
                        Nombre = "Nicolas",
                        Apellido = "Vitek",
                        DNI = 23344312,
                        Direccion = "Bynnon 2331",
                        Telefono = "4234-1231"
                    });
                entity
                .HasMany<Carrito>(cl => cl.Carrito)
                .WithOne(c => c.Cliente);

            });
            modelBuilder.Entity<Producto>().HasData(
            new
            {
                ProductoId = 1,
                Nombre = "Alfajor",
                Descripcion = "40 grm",
                Marca = "Sol Serrano",
                Codigo = "a-043",
                Precio = 37.99,
                Image = "Http://static.cotodigital3.com.ar/sitios/fotos/full/00523500/00523588.jpg?3.0.138f",
            },
            new
            {
                ProductoId = 2,
                Nombre = "Yerba mate",
                Descripcion = "Edicion 1950, 1 kgrm",
                Marca = "Amanda",
                Codigo = "a-099",
                Precio = 543.33,
                Image = "https://static.cotodigital3.com.ar/sitios/fotos/full/00510600/00510606.jpg?3.0.138f",
            },
            new
            {
                ProductoId = 3,
                Nombre = "Pure de tomate",
                Descripcion = "520 grm",
                Marca = "Corper",
                Codigo = "a-007",
                Precio = 95.40,
                Image = "https://static.cotodigital3.com.ar/sitios/fotos/full/00263300/00263369.jpg?3.0.138f",
            },
            new
            {
                ProductoId = 4,
                Nombre = "Cafe molido",
                Descripcion = "20 grm",
                Marca = "La Virginia",
                Codigo = "a-211",
                Precio = 388.15,
                Image = "https://static.cotodigital3.com.ar/sitios/fotos/full/00230100/00230124.jpg?3.0.138f",
            },
            new
            {
                ProductoId = 5,
                Nombre = "Arvejas",
                Descripcion = "Bajo en sodio, 340 grm",
                Marca = "Doña Pupa",
                Codigo = "a-055",
                Precio = 65.39,
                Image = "https://static.cotodigital3.com.ar/sitios/fotos/full/00537400/00537472.jpg?3.0.138f",
            },
            new
            {
                ProductoId = 6,
                Nombre = "Agua mineral",
                Descripcion = "Sin gas, 2.5 lt",
                Marca = "Bonaqua",
                Codigo = "b-013",
                Precio = 91.71,
                Image = "https://static.cotodigital3.com.ar/sitios/fotos/full/00289600/00289636.jpg?3.0.138f",
            },
            new
            {
                ProductoId = 7,
                Nombre = "Gaseosa",
                Descripcion = "Light, 2 lt",
                Marca = "Coca-Cola",
                Codigo = "b-020",
                Precio = 134.55,
                Image = "https://static.cotodigital3.com.ar/sitios/fotos/full/00189500/00189594.jpg?3.0.138f",
            },
            new
            {
                ProductoId = 8,
                Nombre = "Leche",
                Descripcion = "Entera, sache 1 lt",
                Marca = "La Serenisima",
                Codigo = "f-103",
                Precio = 183.25,
                Image = "https://static.cotodigital3.com.ar/sitios/fotos/full/00170500/00170599.jpg?3.0.138f",
            },
            new
            {
                ProductoId = 9,
                Nombre = "Cookie Sandwich",
                Descripcion = "Caja 160 grm",
                Marca = "Fudy",
                Codigo = "c-017",
                Precio = 259.00,
                Image = "https://static.cotodigital3.com.ar/sitios/fotos/full/00499100/00499140.jpg?3.0.138f",
            },
            new
            {
                ProductoId = 10,
                Nombre = "Pañuelos",
                Descripcion = "Doble hoja, caja 100u",
                Marca = "Elite",
                Codigo = "l-022",
                Precio = 149.87,
                Image = "https://static.cotodigital3.com.ar/sitios/fotos/full/00264600/00264677.jpg?3.0.138f",
            }
            );

            modelBuilder.Entity<Carrito>(entity =>
            {
                entity.ToTable("Carrito");
                entity.HasKey(e => e.CarritoId);
                entity.Property(t => t.CarritoId).ValueGeneratedOnAdd();
                entity.Property(c => c.Estado).HasColumnType("bit");
                entity.HasOne<Orden>(c => c.Orden);
                entity
                .HasOne<Cliente>(c => c.Cliente)
                .WithMany(cl => cl.Carrito)
                .HasForeignKey(c => c.ClienteId);
                entity
                .HasOne<Orden>(c => c.Orden)
                .WithOne(o => o.Carrito)
                .HasForeignKey<Orden>(o => o.CarritoId);
            });
            modelBuilder.Entity<Producto>(entity =>
            {
                entity.ToTable("Producto");
                entity.HasKey(p => p.ProductoId);
                entity.Property(p => p.ProductoId).ValueGeneratedOnAdd();
                entity.Property(p => p.Nombre).HasColumnType("nvarchar(max)");
                entity.Property(p => p.Descripcion).HasColumnType("nvarchar(max)");
                entity.Property(p => p.Marca).HasColumnType("nvarchar(25)");
                entity.Property(p => p.Codigo).HasColumnType("nvarchar(25)");
                entity.Property(p => p.Precio).HasColumnType("decimal(15,2)");
                entity.Property(p => p.Image).HasColumnType("nvarchar(max)");
                entity
                .HasMany<CarritoProducto>(p => p.CarritoProducto)
                .WithOne(cp => cp.Producto);
            });
            modelBuilder.Entity<Orden>(entity =>
            {
                entity.ToTable("Orden");
                entity.HasKey(o => o.OrdenId);
                entity.Property(p => p.OrdenId).ValueGeneratedOnAdd();
                entity.Property(o => o.Total).HasColumnType("decimal(15,2)");
                entity.Property(o => o.Fecha).HasColumnType("datetime");
            });
            modelBuilder.Entity<CarritoProducto>(entity =>
            {
                entity.ToTable("CarritoProducto");
                entity.HasKey(cp => new { cp.CarritoId, cp.ProductoId });
                entity.Property(o => o.Cantidad).HasColumnType("int");
                entity
                .HasOne<Carrito>(cp => cp.Carrito)
                .WithMany(c => c.CarritoProducto)
                .HasForeignKey(cp => cp.CarritoId);
                entity
                .HasOne<Producto>(cp => cp.Producto)
                .WithMany(p => p.CarritoProducto)
                .HasForeignKey(cp => cp.ProductoId);
            });
        }
    }
}
