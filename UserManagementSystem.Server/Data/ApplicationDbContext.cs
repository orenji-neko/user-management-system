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

            var user = new User
            {
                Id = "user-0001",
                FirstName = "John",
                LastName = "Doe",
                Title = "Mr.",
                Email = "user@email.com",
                NormalizedEmail = "USER@EMAIL.COM",
                EmailConfirmed = false,
            };
            user.PasswordHash = passwordHasher.HashPassword(user, "password");

            builder.Entity<User>().HasData(user);
            builder.Entity<Role>().HasData(userRole);
            builder.Entity<IdentityUserRole<string>>()
                .HasData(
                    new IdentityUserRole<string>
                    {
                        RoleId = userRole.Id,
                        UserId = user.Id,
                    }
                );
        }
    }
}
