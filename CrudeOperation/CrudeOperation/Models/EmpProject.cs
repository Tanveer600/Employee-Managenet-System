namespace CrudeOperation.Models
{
  public class EmpProject
  {
    public int empProjectId { get; set; }
    public int projectId { get; set; }
    public int empId { get; set; }
    public DateTime assignedDate { get; set; }
    public string role { get; set; }
    public string isActive { get; set; }
    public string projectName { get; set; }
    public string employeeName { get; set; }
  }
}
