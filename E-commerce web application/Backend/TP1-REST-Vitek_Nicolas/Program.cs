using System.Reflection;
using System.Text;
using System.Text.Json.Serialization;
using Application.Interface;
using Application.UserCase;
using Application.UserCase.cart;
using Application.UserCase.Product;
using Infraesctructure.Command;
using Infraesctructure.Persistence;
using Infraesctructure.Query;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using TP1_REST_Vitek_Nicolas.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc(
        "v1",
        new OpenApiInfo
        {
            Title = "E-commerce API",
            Version = "v1",
            Description =
                "API REST para gestión de clientes, productos, carritos y órdenes de compra.",
        }
    );
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);
    c.AddSecurityDefinition(
        "Bearer",
        new OpenApiSecurityScheme
        {
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            Scheme = "Bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Description =
                "Ingresá el token JWT (sin el prefijo 'Bearer ', Swagger lo agrega solo).",
        }
    );

    c.AddSecurityRequirement(
        new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer",
                    },
                },
                Array.Empty<string>()
            },
        }
    );
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(connectionString, b => b.MigrationsAssembly("Infraestructure"))
);

builder.Services.AddScoped<IClientService, ClientService>();
builder.Services.AddScoped<IClientCommand, ClientCommand>();
builder.Services.AddScoped<IClientQuery, ClientQuery>();

builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IProductQuery, ProductQuery>();

builder.Services.AddScoped<ICartService, CartService>();
builder.Services.AddScoped<ICartCommand, CartCommand>();

builder.Services.AddScoped<IProductCartService, ProductCartService>();
builder.Services.AddScoped<ICartQuery, CartQuery>();
builder.Services.AddScoped<IProductCartCommand, ProductCartCommand>();
builder.Services.AddScoped<IProductCartQuery, ProductCartQuery>();

builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IOrderCommand, OrderCommand>();
builder.Services.AddScoped<IOrderQuery, OrderQuery>();

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder
    .Services.AddControllers()
    .AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve);

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: "politica",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:5500", "http://127.0.0.1:5500")
                .AllowAnyHeader()
                .AllowAnyMethod();
        }
    );
});

var jwtKey = builder.Configuration["Jwt:Key"]!;
var jwtIssuer = builder.Configuration["Jwt:Issuer"]!;
var jwtAudience = builder.Configuration["Jwt:Audience"]!;

builder
    .Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
        };
    });

builder.Services.AddAuthorization();
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
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
