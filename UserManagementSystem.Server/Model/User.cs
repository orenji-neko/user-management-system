using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace UserManagementSystem.Server.Model
{
    public class User : IdentityUser
    {
        [Required]
        public string? Title { get; set; }

        [Required] 
        public string? FirstName { get; set; }

        [Required]
        public string? LastName { get; set; }
    }
}
