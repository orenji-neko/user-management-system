using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using UserManagementSystem.Server.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace UserManagementSystem.Server.Data
{
    public class ApplicationDbContext : IdentityDbContext<User, Role, string>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            optionsBuilder.ConfigureWarnings(warnings =>
                warnings.Ignore(RelationalEventId.PendingModelChangesWarning));
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var passwordHasher = new PasswordHasher<User>();

            var userRole = new Role
            {
                Id = "role-user",
                Name = "User",
                NormalizedName = "USER"
            };
            var adminRole = new Role
            {
                Id = "role-admin",
                Name = "Admin",
                NormalizedName = "ADMIN"
            };
            builder.Entity<Role>().HasData(userRole);
            builder.Entity<Role>().HasData(adminRole);

            var user = new User
            {
                Id = "user-0001",
                FirstName = "John",
                LastName = "Doe",
                Title = "Mr.",
                Email = "user@email.com",
                NormalizedEmail = "USER@EMAIL.COM",
                UserName = "user@email.com",
                NormalizedUserName = "USER@EMAIL.COM",
                EmailConfirmed = false,
            };
            user.PasswordHash = passwordHasher.HashPassword(user, "password");
            builder.Entity<User>().HasData(user);
            builder.Entity<IdentityUserRole<string>>()
                .HasData(
                    new IdentityUserRole<string>
                    {
                        RoleId = userRole.Id,
                        UserId = user.Id,
                    }
                );

            var admin = new User
            {
                Id = "admin-0001",
                FirstName = "Ricardo",
                LastName = "Milos",
                Title = "Mr.",
                Email = "admin@email.com",
                NormalizedEmail = "ADMIN@EMAIL.COM",
                UserName = "admin@email.com",
                EmailConfirmed = false,
            };
            admin.PasswordHash = passwordHasher.HashPassword(user, "password");
            builder.Entity<User>().HasData(admin);
            builder.Entity<IdentityUserRole<string>>()
                .HasData(
                    new IdentityUserRole<string>
                    {
                        RoleId = adminRole.Id,
                        UserId = admin.Id,
                    }
                );
        }
    }
}
