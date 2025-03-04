using CrudeOperation.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrudeOperation.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  
  public class projectemployeeController : ControllerBase
  {
    private readonly MyDbContext context;

    public projectemployeeController(MyDbContext context)
    {
      this.context = context;
    }
    // GET: api/Crudeapi
    [HttpGet]
    public async Task<ActionResult<List<EmpProject>>> GetProject()
    {
      return await context.EmpProjects.ToListAsync();
    }

    // GET: api/Crudeapi/5
    [HttpGet("{id}")]
    public async Task<ActionResult<EmpProject>> GetProjectbyid(int id)
    {
      var item = await context.EmpProjects.FindAsync(id);

      if (item == null)
      {
        return NotFound();
      }

      return item;
    }

    // POST: api/Crudeapi
    [HttpPost]
    public async Task<ActionResult<EmpProject>> CreateProject(EmpProject item)
    {
      context.EmpProjects.Add(item);
      await context.SaveChangesAsync();

      return CreatedAtAction(nameof(EmpProject), new { id = item.empProjectId }, item);
    }

    // PUT: api/Crudeapi/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateeProject(int id, EmpProject item)
    {
      if (id != item.empProjectId)
      {
        return BadRequest();
      }

      context.Entry(item).State = EntityState.Modified;

      try
      {
        await context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!ItemExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }

    // DELETE: api/Crudeapi/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProject(int id)
    {
      var item = await context.EmpProjects.FindAsync(id);
      if (item == null)
      {
        return NotFound();
      }

      context.EmpProjects.Remove(item);
      await context.SaveChangesAsync();

      return NoContent();
    }

    private bool ItemExists(int id)
    {
      return context.EmpProjects.Any(e => e.empProjectId == id);
    }
  }


}
