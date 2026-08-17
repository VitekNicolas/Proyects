using Application.Interface;
using Application.UserCase.cart;
using Application.UserCase;
using Application.UserCase.Product;
using Infraesctructure.Command;
using Infraesctructure.Persistence;
using Infraesctructure.Query;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using System.Reflection;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo
        {
            Title = "E-commerce API",
            Version = "v1",
            Description = "API REST para gestión de clientes, productos, carritos y órdenes de compra."
        });
        var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
        var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
        c.IncludeXmlComments(xmlPath);
    });

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(connectionString,
        b => b.MigrationsAssembly("Infraestructure")));

builder.Services.AddScoped<IClientService, ClientService>();
builder.Services.AddScoped<IClientCommand, ClientCommand>();
builder.Services.AddScoped<IClientQuery, ClientQuery>();

builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IProductQuery, ProductQuery>();

builder.Services.AddScoped<IProductCartService, ProductCartService>();
builder.Services.AddScoped<ICartQuery, CartQuery>();
builder.Services.AddScoped<IProductCartCommand, ProductCartCommand>();
builder.Services.AddScoped<IProductCartQuery, ProductCartQuery>();

builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IOrderCommand, OrderCommand>();
builder.Services.AddScoped<IOrderQuery, OrderQuery>();
builder.Services.AddControllers().AddJsonOptions(x =>
   x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve);

builder.Services.AddCors(options =>
{
    options.AddPolicy(
                      name: "politica",
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5500")
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                      });
                      
});
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    });

}
app.UseHttpsRedirection();
app.UseCors("politica");
app.UseAuthorization();
app.MapControllers();
app.Run();