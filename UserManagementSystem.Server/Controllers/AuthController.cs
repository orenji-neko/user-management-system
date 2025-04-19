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
        public async Task<IActionResult> Login([FromBody] LoginBody model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(model.Email!);
            if (user == null)
            {
                return NotFound(ModelState);
            }

            var result = await _signInManager.PasswordSignInAsync(user, model.Password!, false, false);
            if (!result.Succeeded)
            {
                return BadRequest(ModelState);
            }

            return Ok();
        }
    }
}
