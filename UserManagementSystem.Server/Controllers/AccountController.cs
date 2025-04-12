using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserManagementSystem.Server.Data;
using UserManagementSystem.Server.Model;

namespace UserManagementSystem.Server.Controllers;

[ApiController]
[Route("accounts")]
public class AccountController : Controller
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;

    public AccountController(ApplicationDbContext context, UserManager<User> userManager, SignInManager<User> signInManager)
    {
        _context = context;
        _userManager = userManager;
        _signInManager = signInManager;
    }

    /**
     * [GET] /accounts/
     */
    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetAccounts()
    {
        var users = await _context.Users.ToArrayAsync();
        return users;
    }
}
