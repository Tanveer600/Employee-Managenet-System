using CrudeOperation.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrudeOperation.Controllers
{
  [Route("api/[controller]")]
  [ApiController]



  public class ProjectController : ControllerBase
  {
    private readonly MyDbContext context;

    public ProjectController(MyDbContext context)
    {
      this.context = context;
    }
    // GET: api/Crudeapi
    [HttpGet]
    public async Task<ActionResult<List<Project>>> GetProject()
    {
      return await context.Projects.ToListAsync();
    }

    // GET: api/Crudeapi/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Project>> GetProjectbyid(int id)
    {
      var item = await context.Projects.FindAsync(id);

      if (item == null)
      {
        return NotFound();
      }

      return item;
    }

    // POST: api/Crudeapi
    [HttpPost]
    public async Task<ActionResult<Employee>> CreateProject(Project item)
    {
      context.Projects.Add(item);
      await context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetProject), new { id = item.projectId }, item);
    }

    // PUT: api/Crudeapi/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateeProject(int id, Project item)
    {
      if (id != item.projectId)
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
      var item = await context.Projects.FindAsync(id);
      if (item == null)
      {
        return NotFound();
      }

      context.Projects.Remove(item);
      await context.SaveChangesAsync();

      return NoContent();
    }

    private bool ItemExists(int id)
    {
      return context.Projects.Any(e => e.projectId == id);
    }
  }
}
