using Infraesctructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

        // Usa la configuración adecuada para tu entorno de diseño
        optionsBuilder.UseSqlite("Data Source=ecommerce_db.db"); // Cambia a tu cadena de conexión

        return new AppDbContext(optionsBuilder.Options);
    }
}
