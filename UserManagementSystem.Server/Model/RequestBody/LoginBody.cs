using System.ComponentModel.DataAnnotations;

namespace UserManagementSystem.Server.Model.RequestBody
{
    public class LoginBody
    {
        [Required]
        public string? Email { get; set; }

        [Required]
        public string? Password { get; set; }
    }
}
