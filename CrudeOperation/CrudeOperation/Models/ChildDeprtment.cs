using System.ComponentModel.DataAnnotations;

namespace CrudeOperation.Models
{
  public class DeprtmentChild
  {
    [Key]
    public int childDeptId { get; set; }
    public string? departmentName { get; set; }

    public int parentDeptId { get; set; }
  }
}
