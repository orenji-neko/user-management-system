using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using UserManagementSystem.Server.Data;
using UserManagementSystem.Server.Model;
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
     * [GET] /accounts/
     * Gets user accounts in a list form.
     */
    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetAccounts()
    {
        var users = await _context.Users.ToArrayAsync();
        return users;
    }

    /**
     * [POST] /accounts/
     * Create account.
     */
    [HttpPost]
    public async Task<IActionResult> CreateAccount([FromBody] CreateUserBody UserBody)
    {
        if(!ModelState.IsValid)
        {
            return BadRequest();
        }

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

        var result = await _userManager.CreateAsync(newUser, UserBody.Password!);

        // If creating user doesn't succeed.
        if (!result.Succeeded)
        {
            return BadRequest(new { errors = result.Errors.Select(e => e.Description) });
        }

        return Ok();
    }

    /**
     * [DELETE] /accounts/
     * Create account.
     */
    [HttpDelete("{id}")]
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
