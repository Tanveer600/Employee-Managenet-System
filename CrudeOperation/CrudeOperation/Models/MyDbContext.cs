using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CrudeOperation.Models;

public partial class MyDbContext : DbContext
{
  

    public MyDbContext(DbContextOptions<MyDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Department> Departments { get; set; }
    public virtual DbSet<User> Users { get; set; }
  
    public virtual DbSet<Employee> Employees { get; set; }
    public virtual DbSet<Project> Projects { get; set; }
    public virtual DbSet<Leave> Leaves { get; set; }
    public virtual DbSet<EmpProject> EmpProjects { get; set; }
    public virtual DbSet<Dashboard> Dashboards { get; set; }
    public virtual DbSet<DeprtmentChild> DeprtmentChilds { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {

        }
    }

 

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
