using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserManagementSystem.Server.Migrations
{
    /// <inheritdoc />
    public partial class seed2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "admin-0001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "4e72e996-d451-4387-b3b3-246abb483b8f", "AQAAAAIAAYagAAAAEBA3FdytRmIjCLO/3e8DNPE4qVExkt2AaT3dBGhP9HwZHIlq26mbF5oXy397aMcltQ==", "de357dfa-d110-4516-b935-b15c8432914d" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "user-0001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "5e8845c9-4c36-4bb1-a7d1-cb1db79baea8", "AQAAAAIAAYagAAAAEHcGnlc4Y7E7rVU8iCPL4EBh685a5XsgWrbvyRoGNJ4PDXFrZeHFN7IUUnyt1KnKnA==", "b2999bda-d006-45a8-97d2-020f53baf1f0" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "admin-0001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "714da48e-498d-4324-83f7-91f5f04f1a8e", null, "369b3b40-559e-4768-9b3c-9de868efa201" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "user-0001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e6d69294-28aa-4605-a006-697143925032", "AQAAAAIAAYagAAAAECPLqWBXu5Z9ynF4EM/Z3L0p95BNBZ/qrgQEurkXiDKulJp3iEetS5pao8n3JypJYw==", "b91eef61-ba27-4519-803e-413d92ca9691" });
        }
    }
}
