using CrudeOperation.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrudeOperation.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class DepartmentController : ControllerBase
  {
    private readonly MyDbContext context;

    public DepartmentController(MyDbContext context)
    {
      this.context = context;
    }
    // GET: api/Crudeapi
    [HttpGet]
    public async Task<ActionResult<List<Department>>> GetDepartment()
    {
      return await context.Departments.ToListAsync();
    }

    // GET: api/Crudeapi/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Department>> GetDepartmentbyid(int id)
    {
      var item = await context.Departments.FindAsync(id);

      if (item == null)
      {
        return NotFound();
      }

      return item;
    }

    // POST: api/Crudeapi
    [HttpPost]
    public async Task<ActionResult<Department>> CreateDepartment(Department item)
    {
      context.Departments.Add(item);
      await context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetDepartment), new { id = item.departmentId }, item);
    }

    // PUT: api/Crudeapi/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateeDepartment(int id, Department item)
    {
      if (id != item.departmentId)
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
    public async Task<IActionResult> DeleteDepartment(int id)
    {
      var item = await context.Departments.FindAsync(id);
      if (item == null)
      {
        return NotFound();
      }

      context.Departments.Remove(item);
      await context.SaveChangesAsync();

      return NoContent();
    }

    private bool ItemExists(int id)
    {
      return context.Departments.Any(e => e.departmentId == id);
    }
  }
}
