using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infraesctructure.Migrations
{
    /// <inheritdoc />
    public partial class RemoveClientSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Client",
                keyColumn: "clientId",
                keyValue: 1);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Client",
                columns: new[] { "clientId", "address", "dni", "email", "firstName", "lastName", "passwordHash", "phoneNumber" },
                values: new object[] { 1, "Bynnon 2331", 23344312, "nicolas@example.com", "Nicolas", "Vitek", "TEMP_HASH_PLACEHOLDER", "4234-1231" });
        }
    }
}
