using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace UserManagementSystem.Server.Model.RequestBody
{
    public class CreateUserBody
    {
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
        [Required] 
        public string? Title { get; set; }
        [Required] 
        public string? LastName { get; set; }
        [Required] 
        public string? FirstName { get; set; }
    }
}
