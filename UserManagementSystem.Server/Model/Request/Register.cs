﻿using System.ComponentModel.DataAnnotations;

namespace UserManagementSystem.Server.Model.RequestBody
{
    public class Register
    {
        [Required] public string? Email { get; set; }
        [Required] public string? Password { get; set; }
        [Required] public string? FirstName { get; set; }
        [Required] public string? LastName { get; set; }
        [Required] public string? Title { get; set; }
    }
}
