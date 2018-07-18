using System;
using System.Text;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LandmarkRemark.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //Create the necessary tables for the project (Users,Remarks)
            migrationBuilder.CreateTable(
                name: "Remark",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Latitude = table.Column<decimal>(type: "decimal(38, 20)", nullable: false),
                    Longitude = table.Column<decimal>(type: "decimal(38, 20)", nullable: false),
                    Notes = table.Column<string>(nullable: true),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    Address = table.Column<string>(nullable: true),
                    Username = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Remark", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Username = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });


            //Seed the Users Table with test login information 
            var hmac = new System.Security.Cryptography.HMACSHA512();

            migrationBuilder.InsertData(
            table: "Users",
            columns: new[] { "Id", "FirstName", "PasswordHash", "PasswordSalt", "Username" },
            values: new object[] {
                1,
                "Test1",
                hmac.ComputeHash(Encoding.UTF8.GetBytes("123456")),
                hmac.Key,
                "Test1"
            });

            migrationBuilder.InsertData(
            table: "Users",
            columns: new[] { "Id", "FirstName", "PasswordHash", "PasswordSalt", "Username" },
            values: new object[] {
                2,
                "Test2",
                hmac.ComputeHash(Encoding.UTF8.GetBytes("123456")),
                hmac.Key,
                "Test2"
            });

            migrationBuilder.InsertData(
            table: "Users",
            columns: new[] { "Id", "FirstName", "PasswordHash", "PasswordSalt", "Username" },
            values: new object[] {
                3,
                "Test3",
                hmac.ComputeHash(Encoding.UTF8.GetBytes("123456")),
                hmac.Key,
                "Test3"
            });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Remark");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
