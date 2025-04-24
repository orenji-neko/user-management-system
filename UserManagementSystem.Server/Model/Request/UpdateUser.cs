using System.ComponentModel.DataAnnotations;

namespace UserManagementSystem.Server.Model.Request
{
    public class UpdateUser
    {
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? Title { get; set; }
        [Required]
        public string? LastName { get; set; }
        [Required]
        public string? FirstName { get; set; }
    }
}
