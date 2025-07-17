using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TP1_ORM_Vitek_Nicolas.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cliente",
                columns: table => new
                {
                    ClienteId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DNI = table.Column<string>(type: "nvarchar(10)", nullable: false),
                    Nombre = table.Column<string>(type: "nvarchar(25)", nullable: false),
                    Apellido = table.Column<string>(type: "nvarchar(25)", nullable: false),
                    Direccion = table.Column<string>(type: "nvarchar(MAX)", nullable: false),
                    Telefono = table.Column<string>(type: "nvarchar(13)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cliente", x => x.ClienteId);
                });

            migrationBuilder.CreateTable(
                name: "Producto",
                columns: table => new
                {
                    ProductoId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Marca = table.Column<string>(type: "nvarchar(25)", nullable: false),
                    Codigo = table.Column<string>(type: "nvarchar(25)", nullable: false),
                    Precio = table.Column<decimal>(type: "decimal(15,2)", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Producto", x => x.ProductoId);
                });

            migrationBuilder.CreateTable(
                name: "Carrito",
                columns: table => new
                {
                    CarritoId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ClienteId = table.Column<int>(type: "int", nullable: false),
                    Estado = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Carrito", x => x.CarritoId);
                    table.ForeignKey(
                        name: "FK_Carrito_Cliente_ClienteId",
                        column: x => x.ClienteId,
                        principalTable: "Cliente",
                        principalColumn: "ClienteId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CarritoProducto",
                columns: table => new
                {
                    CarritoId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductoId = table.Column<int>(type: "int", nullable: false),
                    Cantidad = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarritoProducto", x => new { x.CarritoId, x.ProductoId });
                    table.ForeignKey(
                        name: "FK_CarritoProducto_Carrito_CarritoId",
                        column: x => x.CarritoId,
                        principalTable: "Carrito",
                        principalColumn: "CarritoId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CarritoProducto_Producto_ProductoId",
                        column: x => x.ProductoId,
                        principalTable: "Producto",
                        principalColumn: "ProductoId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Orden",
                columns: table => new
                {
                    OrdenId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CarritoId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime", nullable: false),
                    Total = table.Column<decimal>(type: "decimal(15,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orden", x => x.OrdenId);
                    table.ForeignKey(
                        name: "FK_Orden_Carrito_CarritoId",
                        column: x => x.CarritoId,
                        principalTable: "Carrito",
                        principalColumn: "CarritoId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Cliente",
                columns: new[] { "ClienteId", "Apellido", "DNI", "Direccion", "Nombre", "Telefono" },
                values: new object[] { 1, "Vitek", "23344312", "Bynnon 2331", "Nicolas", "4234-1231" });

            migrationBuilder.InsertData(
                table: "Producto",
                columns: new[] { "ProductoId", "Codigo", "Descripcion", "Image", "Marca", "Nombre", "Precio" },
                values: new object[,]
                {
                    { 1, "a-043", "40 grm", "Http://static.cotodigital3.com.ar/sitios/fotos/full/00523500/00523588.jpg?3.0.138f", "Sol Serrano", "Alfajor", 37.99m },
                    { 2, "a-099", "Edicion 1950, 1 kgrm", "https://static.cotodigital3.com.ar/sitios/fotos/full/00510600/00510606.jpg?3.0.138f", "Amanda", "Yerba mate", 543.33m },
                    { 3, "a-007", "520 grm", "https://static.cotodigital3.com.ar/sitios/fotos/full/00263300/00263369.jpg?3.0.138f", "Corper", "Pure de tomate", 95.4m },
                    { 4, "a-211", "20 grm", "https://static.cotodigital3.com.ar/sitios/fotos/full/00230100/00230124.jpg?3.0.138f", "La Virginia", "Cafe molido", 388.15m },
                    { 5, "a-055", "Bajo en sodio, 340 grm", "https://static.cotodigital3.com.ar/sitios/fotos/full/00537400/00537472.jpg?3.0.138f", "Doña Pupa", "Arvejas", 65.39m },
                    { 6, "b-013", "Sin gas, 2.5 lt", "https://static.cotodigital3.com.ar/sitios/fotos/full/00289600/00289636.jpg?3.0.138f", "Bonaqua", "Agua mineral", 91.71m },
                    { 7, "b-020", "Light, 2 lt", "https://static.cotodigital3.com.ar/sitios/fotos/full/00189500/00189594.jpg?3.0.138f", "Coca-Cola", "Gaseosa", 134.55m },
                    { 8, "f-103", "Entera, sache 1 lt", "https://static.cotodigital3.com.ar/sitios/fotos/full/00170500/00170599.jpg?3.0.138f", "La Serenisima", "Leche", 183.25m },
                    { 9, "c-017", "Caja 160 grm", "https://static.cotodigital3.com.ar/sitios/fotos/full/00499100/00499140.jpg?3.0.138f", "Fudy", "Cookie Sandwich", 259m },
                    { 10, "l-022", "Doble hoja, caja 100u", "https://static.cotodigital3.com.ar/sitios/fotos/full/00264600/00264677.jpg?3.0.138f", "Elite", "Pañuelos", 149.87m }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Carrito_ClienteId",
                table: "Carrito",
                column: "ClienteId");

            migrationBuilder.CreateIndex(
                name: "IX_CarritoProducto_ProductoId",
                table: "CarritoProducto",
                column: "ProductoId");

            migrationBuilder.CreateIndex(
                name: "IX_Orden_CarritoId",
                table: "Orden",
                column: "CarritoId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CarritoProducto");

            migrationBuilder.DropTable(
                name: "Orden");

            migrationBuilder.DropTable(
                name: "Producto");

            migrationBuilder.DropTable(
                name: "Carrito");

            migrationBuilder.DropTable(
                name: "Cliente");
        }
    }
}
