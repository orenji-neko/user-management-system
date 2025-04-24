using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using UserManagementSystem.Server.Data;
using UserManagementSystem.Server.Model;
using UserManagementSystem.Server.Model.Request;
using UserManagementSystem.Server.Model.RequestBody;

namespace UserManagementSystem.Server.Controllers;

[ApiController]
[Route("accounts")]
public class AccountController : Controller
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;

    public AccountController(
        ApplicationDbContext context, 
        UserManager<User> userManager, 
        SignInManager<User> signInManager
        )
    {
        _context = context;
        _userManager = userManager;
        _signInManager = signInManager;
    }

    /**
     * [GET] /accounts
     * Gets user accounts in a list form.
     */
    [HttpGet]
    [Authorize(Policy = "AdminOnly")]
    public async Task<ActionResult<IEnumerable<User>>> GetAccounts()
    {
        var users = await _context.Users.ToArrayAsync();
        return users;
    }

    /**
     * [POST] /accounts
     * Create account.
     */
    [HttpPost]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> CreateAccount([FromBody] CreateUser UserBody)
    {
        if(!ModelState.IsValid)
        {
            Console.WriteLine("Invalid request!");
            return BadRequest();
        }

        var hasher = new PasswordHasher<User>();

        var newUser = new User
        {
            Email = UserBody.Email,
            NormalizedEmail = UserBody.Email!.ToUpper(),
            UserName = UserBody.Email,
            NormalizedUserName = UserBody.Email!.ToUpper(),
            FirstName = UserBody.FirstName,
            LastName = UserBody.LastName,
            Title = UserBody.Title,
            EmailConfirmed = false,
        };
        newUser.PasswordHash = hasher.HashPassword(newUser, UserBody.Password);

        var result = await _userManager.CreateAsync(newUser);

        // If creating user doesn't succeed.
        if (!result.Succeeded)
        {
            Console.WriteLine("Creation failed!");
            return BadRequest();
        }

        return Ok();
    }

    /**
     * [PUT] /accounts
     * Create account.
     */
    [HttpPut("{id}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> UpdateAccount(string id, [FromBody] UpdateUser UserBody)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null)
        {
            Console.WriteLine("Missing user!");
            return BadRequest();
        }

        user.FirstName = UserBody.FirstName;
        user.LastName = UserBody.LastName;
        user.Title = UserBody.Title;
        user.Email = UserBody.Email;

        var result = await _userManager.UpdateAsync(user);

        // If creating user doesn't succeed.
        if (!result.Succeeded)
        {
            Console.WriteLine("Failed to update user!");
            return BadRequest(new { errors = result.Errors.Select(e => e.Description) });
        }

        return Ok();
    }

    /**
     * [DELETE] /accounts
     * Create account.
     */
    [HttpDelete("{id}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> DeleteAccount(string id)
    {
        var user = await _context.Users.FindAsync(id);

        if(user == null)
        {
            return NotFound();
        }

        var result = await _userManager.DeleteAsync(user);

        if(!result.Succeeded)
        {
            return BadRequest();
        }

        return Ok();
    }
}
