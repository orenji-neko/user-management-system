using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserManagementSystem.Server.Migrations
{
    /// <inheritdoc />
    public partial class seed1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "role-admin", null, "Admin", "ADMIN" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "user-0001",
                columns: new[] { "ConcurrencyStamp", "NormalizedUserName", "PasswordHash", "SecurityStamp", "UserName" },
                values: new object[] { "e6d69294-28aa-4605-a006-697143925032", "USER@EMAIL.COM", "AQAAAAIAAYagAAAAECPLqWBXu5Z9ynF4EM/Z3L0p95BNBZ/qrgQEurkXiDKulJp3iEetS5pao8n3JypJYw==", "b91eef61-ba27-4519-803e-413d92ca9691", "user@email.com" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "Title", "TwoFactorEnabled", "UserName" },
                values: new object[] { "admin-0001", 0, "714da48e-498d-4324-83f7-91f5f04f1a8e", "admin@email.com", false, "Ricardo", "Milos", false, null, "ADMIN@EMAIL.COM", null, null, null, false, "369b3b40-559e-4768-9b3c-9de868efa201", "Mr.", false, "admin@email.com" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "role-admin", "admin-0001" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "role-admin", "admin-0001" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "role-admin");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "admin-0001");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "user-0001",
                columns: new[] { "ConcurrencyStamp", "NormalizedUserName", "PasswordHash", "SecurityStamp", "UserName" },
                values: new object[] { "5ef5e9fe-568e-41a6-a4ba-0a6d88c85410", null, "AQAAAAIAAYagAAAAEI02m0AWUW5W32jTnqBlHMDZ8QpQ/XvLYBE9vfd6pnEr0iLLvg5iSmHKaTPchqEAsQ==", "6ec2fcc6-2c89-409e-88a5-905e5a6f554a", null });
        }
    }
}
