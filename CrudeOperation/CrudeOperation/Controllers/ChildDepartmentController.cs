using CrudeOperation.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrudeOperation.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ChildDepartmentController : ControllerBase
  {
   
      private readonly MyDbContext context;

      public ChildDepartmentController(MyDbContext context)
      {
        this.context = context;
      }
      // GET: api/Crudeapi
      [HttpGet]
      public async Task<ActionResult<List<DeprtmentChild>>> Getchilddepartment()
      {
        return await context.DeprtmentChilds.ToListAsync();
      }

    // GET: api/ChildDepartment/5
    [HttpGet("{id}")]
    public async Task<ActionResult<List<DeprtmentChild>>> GetchildDepartmentbyid(int id)
    {
      var items = await context.DeprtmentChilds
          .Where(child => child.parentDeptId == id) // Replace with the actual FK field in your model
          .ToListAsync();

      if (!items.Any())
      {
        return NotFound(); // Return 404 if no items found
      }

      return items; // Return the list of child departments
    }
   

      // POST: api/Crudeapi
      [HttpPost]
      public async Task<ActionResult<DeprtmentChild>> CreatechildDepartment(DeprtmentChild item)
      {
        context.DeprtmentChilds.Add(item);
        await context.SaveChangesAsync();

        return CreatedAtAction(nameof(Getchilddepartment), new { id = item.childDeptId }, item);
      }

      // PUT: api/Crudeapi/5
      [HttpPut("{id}")]
      public async Task<IActionResult> UpdatechildDepartment(int id, DeprtmentChild item)
      {
        if (id != item.childDeptId)
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
      public async Task<IActionResult> DeletechildDepartment(int id)
      {
        var item = await context.DeprtmentChilds.FindAsync(id);
        if (item == null)
        {
          return NotFound();
        }

        context.DeprtmentChilds.Remove(item);
        await context.SaveChangesAsync();

        return NoContent();
      }

      private bool ItemExists(int id)
      {
        return context.DeprtmentChilds.Any(e => e.childDeptId == id);
      }
    }
  }

