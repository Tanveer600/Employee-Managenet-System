using CrudeOperation.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrudeOperation.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UserController : ControllerBase
  {
    private readonly MyDbContext context;

    // Constructor to inject the DbContext
    public UserController(MyDbContext context)
    {
      this.context = context;
    }

    [HttpPost("authenticate")]
    public async Task<ActionResult> Authenticate([FromBody] User Userobj)
    {
      if (Userobj == null)
      {
        return BadRequest(new { success = false, message = "Invalid request" });
      }

      var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == Userobj.UserName && x.Password == Userobj.Password);

      if (user == null)
      {
        return NotFound(new { success = false, message = "User not found" });
      }

      return Ok(new { success = true, message = "User login successful" });
    }


    [HttpPost("register")]
    public async Task<ActionResult> RegisterUser([FromBody] User Userobj)
    {
      if (Userobj == null)
      {
        return BadRequest();

      }
      await context.Users.AddAsync(Userobj);
      await context.SaveChangesAsync();
      return Ok(new
      {
        Message = "user register successfully"
      });

    }
  }
}
