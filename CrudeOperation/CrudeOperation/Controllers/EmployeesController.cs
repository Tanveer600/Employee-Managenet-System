using CrudeOperation.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CrudeOperation.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class EmployeesController : ControllerBase
  {
    private readonly MyDbContext context;

    public EmployeesController(MyDbContext context)
    {
      this.context = context;
    }
    // GET: api/Crudeapi
    [HttpGet]
    public async Task<ActionResult<List<Employee>>> GetEmployees()
    {
      return await context.Employees.ToListAsync();
    }

    // GET: api/Crudeapi/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Employee>> GetEmployeesbyid(int id)
    {
      var item = await context.Employees.FindAsync(id);

      if (item == null)
      {
        return NotFound();
      }

      return item;
    }

    // POST: api/Crudeapi
    [HttpPost]
    public async Task<ActionResult<Employee>> CreateEmployees(Employee item)
    {
      context.Employees.Add(item);
      await context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetEmployees), new { id = item.EmployeeId }, item);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateeEployees(int id, Employee employee)
    {
      // Check if the employee ID in the request matches the ID in the URL
      if (id != employee.EmployeeId)
      {
        return BadRequest(new { success = false, message = "Employee ID mismatch" });
      }

      // Check if the employee exists in the database
      if (!ItemExists(id))
      {
        return NotFound(new { success = false, message = "Employee not found" });
      }

      // Mark the entity as modified
      context.Entry(employee).State = EntityState.Modified;

      try
      {
        // Save changes to the database
        await context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        // Handle concurrency exceptions
        if (!ItemExists(id))
        {
          return NotFound(new { success = false, message = "Employee not found" });
        }
        else
        {
          throw;
        }
      }

      // Return success response
      return Ok(new { success = true, message = "Employee updated successfully" });
    }



    // DELETE: api/Crudeapi/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEmployees(int id)
    {
      var employee = await context.Employees.FindAsync(id);
      if (employee == null)
      {
        return NotFound(new { success = false, message = "Employee not found" });
      }

      context.Employees.Remove(employee);
      await context.SaveChangesAsync();

      return Ok(new { success = true, message = "Employee deleted successfully" });
    }
    private bool ItemExists(int id)
    {
      return context.Employees.Any(e => e.EmployeeId == id);
    }
  }
}
