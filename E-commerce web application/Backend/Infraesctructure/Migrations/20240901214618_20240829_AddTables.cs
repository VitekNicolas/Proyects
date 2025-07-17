using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Infraesctructure.Migrations
{
    /// <inheritdoc />
    public partial class _20240829_AddTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Client",
                columns: table => new
                {
                    clientId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    dni = table.Column<int>(type: "nvarchar(10)", nullable: false),
                    firstName = table.Column<string>(type: "nvarchar(25)", nullable: true),
                    lastName = table.Column<string>(type: "nvarchar(25)", nullable: true),
                    address = table.Column<string>(type: "TEXT", nullable: true),
                    phoneNumber = table.Column<string>(type: "nvarchar(13)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Client", x => x.clientId);
                });

            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    productId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    name = table.Column<string>(type: "TEXT", nullable: true),
                    description = table.Column<string>(type: "TEXT", nullable: true),
                    brand = table.Column<string>(type: "nvarchar(25)", nullable: true),
                    code = table.Column<string>(type: "nvarchar(25)", nullable: true),
                    price = table.Column<double>(type: "decimal(15,2)", nullable: false),
                    image = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product", x => x.productId);
                });

            migrationBuilder.CreateTable(
                name: "Cart",
                columns: table => new
                {
                    cartId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    clientId = table.Column<int>(type: "INTEGER", nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cart", x => x.cartId);
                    table.ForeignKey(
                        name: "FK_Cart_Client_clientId",
                        column: x => x.clientId,
                        principalTable: "Client",
                        principalColumn: "clientId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Order",
                columns: table => new
                {
                    orderId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    cartId = table.Column<int>(type: "INTEGER", nullable: false),
                    date = table.Column<DateTime>(type: "datetime", nullable: false),
                    total = table.Column<double>(type: "decimal(15,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order", x => x.orderId);
                    table.ForeignKey(
                        name: "FK_Order_Cart_cartId",
                        column: x => x.cartId,
                        principalTable: "Cart",
                        principalColumn: "cartId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductCart",
                columns: table => new
                {
                    cartId = table.Column<int>(type: "INTEGER", nullable: false),
                    productId = table.Column<int>(type: "INTEGER", nullable: false),
                    amount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductCart", x => new { x.cartId, x.productId });
                    table.ForeignKey(
                        name: "FK_ProductCart_Cart_cartId",
                        column: x => x.cartId,
                        principalTable: "Cart",
                        principalColumn: "cartId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductCart_Product_productId",
                        column: x => x.productId,
                        principalTable: "Product",
                        principalColumn: "productId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Client",
                columns: new[] { "clientId", "address", "dni", "firstName", "lastName", "phoneNumber" },
                values: new object[] { 1, "Bynnon 2331", 23344312, "Nicolas", "Vitek", "4234-1231" });

            migrationBuilder.InsertData(
                table: "Product",
                columns: new[] { "productId", "brand", "code", "description", "image", "name", "price" },
                values: new object[,]
                {
                    { 1, "Sol Serrano", "a-043", "40 grm", "Http://static.cotodigital3.com.ar/sitios/fotos/full/00523500/00523588.jpg?3.0.138f", "Alfajor", 37.990000000000002 },
                    { 2, "Amanda", "a-099", "Edicion 1950, 1 kgrm", "https://static.cotodigital3.com.ar/sitios/fotos/full/00510600/00510606.jpg?3.0.138f", "Yerba mate", 543.33000000000004 },
                    { 3, "Corper", "a-007", "520 grm", "https://static.cotodigital3.com.ar/sitios/fotos/full/00263300/00263369.jpg?3.0.138f", "Pure de tomate", 95.400000000000006 },
                    { 4, "La Virginia", "a-211", "20 grm", "https://static.cotodigital3.com.ar/sitios/fotos/full/00230100/00230124.jpg?3.0.138f", "Cafe molido", 388.14999999999998 },
                    { 5, "Doña Pupa", "a-055", "Bajo en sodio, 340 grm", "https://static.cotodigital3.com.ar/sitios/fotos/full/00537400/00537472.jpg?3.0.138f", "Arvejas", 65.390000000000001 },
                    { 6, "Bonaqua", "b-013", "Sin gas, 2.5 lt", "https://static.cotodigital3.com.ar/sitios/fotos/full/00289600/00289636.jpg?3.0.138f", "Agua mineral", 91.709999999999994 },
                    { 7, "Coca-Cola", "b-020", "Light, 2 lt", "https://static.cotodigital3.com.ar/sitios/fotos/full/00189500/00189594.jpg?3.0.138f", "Gaseosa", 134.55000000000001 },
                    { 8, "La Serenisima", "f-103", "Entera, sache 1 lt", "https://static.cotodigital3.com.ar/sitios/fotos/full/00170500/00170599.jpg?3.0.138f", "Leche", 183.25 },
                    { 9, "Fudy", "c-017", "Caja 160 grm", "https://static.cotodigital3.com.ar/sitios/fotos/full/00499100/00499140.jpg?3.0.138f", "Cookie Sandwich", 259.0 },
                    { 10, "Elite", "l-022", "Doble hoja, caja 100u", "https://static.cotodigital3.com.ar/sitios/fotos/full/00264600/00264677.jpg?3.0.138f", "Pañuelos", 149.87 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cart_clientId",
                table: "Cart",
                column: "clientId");

            migrationBuilder.CreateIndex(
                name: "IX_Order_cartId",
                table: "Order",
                column: "cartId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProductCart_productId",
                table: "ProductCart",
                column: "productId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Order");

            migrationBuilder.DropTable(
                name: "ProductCart");

            migrationBuilder.DropTable(
                name: "Cart");

            migrationBuilder.DropTable(
                name: "Product");

            migrationBuilder.DropTable(
                name: "Client");
        }
    }
}
