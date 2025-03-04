namespace CrudeOperation.Models
{
  public class Project
  {
    public int projectId { get; set; }
    public string projectName { get; set; }
    public string clientName { get; set; }
    public DateTime startDate { get; set; }
    public int leadByEmpId { get; set; }
    public string contactPerson { get; set; }
    public string contactNo { get; set; }
    public string emailId { get; set; }
  }
}
