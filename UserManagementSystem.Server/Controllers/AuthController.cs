using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using UserManagementSystem.Server.Model;
using UserManagementSystem.Server.Model.RequestBody;

namespace UserManagementSystem.Server.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : Controller
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;

        public AuthController(SignInManager<User> signInManager, UserManager<User> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] Login model)
        {
            if (!ModelState.IsValid)
            {
                Console.WriteLine("Invalid body");
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(model.Email!);
            if (user == null)
            {
                Console.WriteLine("Missing user");
                return NotFound(ModelState);
            }

            var result = await _signInManager.PasswordSignInAsync(user, model.Password!, false, false);
            if (!result.Succeeded)
            {
                Console.WriteLine("Login failed");
                return BadRequest(ModelState);
            }

            return Ok();
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult<User>> Register([FromBody] Register model)
        {
            if (!ModelState.IsValid)
            {
                Console.WriteLine("Invalid body");
                return BadRequest(ModelState);
            }

            var passwordhasher = new PasswordHasher<User>();

            var user = new User
            {
                UserName = model.Email,
                NormalizedUserName = model.Email,
                Email = model.Email,
                NormalizedEmail = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Title = model.Title
            };

            if (model.Password == null)
            {
                Console.WriteLine("Missing password");
                return BadRequest(ModelState);
            }

            user.PasswordHash = passwordhasher.HashPassword(user, model.Password);

            var createResult = await _userManager.CreateAsync(user);
            var addRoleResult = await _userManager.AddToRoleAsync(user, "User");

            if (!createResult.Succeeded)
            {
                Console.WriteLine("Failed to create user");
                return BadRequest();
            }

            if (!addRoleResult.Succeeded)
            {
                Console.WriteLine("Failed to add role");
                return BadRequest();
            }

            return user;
        }
    }
}
