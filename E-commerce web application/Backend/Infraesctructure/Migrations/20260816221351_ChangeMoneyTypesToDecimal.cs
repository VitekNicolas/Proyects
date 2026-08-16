using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infraesctructure.Migrations
{
    /// <inheritdoc />
    public partial class ChangeMoneyTypesToDecimal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "productId",
                keyValue: 1,
                column: "price",
                value: 37.99m);

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "productId",
                keyValue: 2,
                column: "price",
                value: 543.33m);

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "productId",
                keyValue: 3,
                column: "price",
                value: 95.40m);

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "productId",
                keyValue: 4,
                column: "price",
                value: 388.15m);

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "productId",
                keyValue: 5,
                column: "price",
                value: 65.39m);

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "productId",
                keyValue: 6,
                column: "price",
                value: 91.71m);

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "productId",
                keyValue: 7,
                column: "price",
                value: 134.55m);

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "productId",
                keyValue: 8,
                column: "price",
                value: 183.25m);

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "productId",
                keyValue: 9,
                column: "price",
                value: 259.00m);

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "productId",
                keyValue: 10,
                column: "price",
                value: 149.87m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "productId",
                keyValue: 1,
                column: "price",
                value: 37.990000000000002);

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "productId",
                keyValue: 2,
                column: "price",
                value: 543.33000000000004);

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "productId",
                keyValue: 3,
                column: "price",
                value: 95.400000000000006);

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "productId",
                keyValue: 4,
                column: "price",
                value: 388.14999999999998);

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "productId",
                keyValue: 5,
                column: "price",
                value: 65.390000000000001);

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "productId",
                keyValue: 6,
                column: "price",
                value: 91.709999999999994);

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "productId",
                keyValue: 7,
                column: "price",
                value: 134.55000000000001);

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "productId",
                keyValue: 8,
                column: "price",
                value: 183.25);

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "productId",
                keyValue: 9,
                column: "price",
                value: 259.0);

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "productId",
                keyValue: 10,
                column: "price",
                value: 149.87);
        }
    }
}
