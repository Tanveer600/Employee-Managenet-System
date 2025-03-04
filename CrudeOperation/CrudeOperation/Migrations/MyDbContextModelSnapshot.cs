﻿// <auto-generated />
using System;
using CrudeOperation.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CrudeOperation.Migrations
{
    [DbContext(typeof(MyDbContext))]
    partial class MyDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("CrudeOperation.Models.Dashboard", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("totalApprovedLeaves")
                        .HasColumnType("int");

                    b.Property<int>("totalCanceledLeave")
                        .HasColumnType("int");

                    b.Property<int>("totalEmployee")
                        .HasColumnType("int");

                    b.Property<int>("totalLeaves")
                        .HasColumnType("int");

                    b.Property<int>("totalNewLeaves")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Dashboards");
                });

            modelBuilder.Entity("CrudeOperation.Models.Department", b =>
                {
                    b.Property<int>("departmentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("departmentId"));

                    b.Property<string>("SudentGender")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("departmentName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("departmentId");

                    b.ToTable("Departments");
                });

            modelBuilder.Entity("CrudeOperation.Models.DeprtmentChild", b =>
                {
                    b.Property<int>("childDeptId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("childDeptId"));

                    b.Property<string>("departmentName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("parentDeptId")
                        .HasColumnType("int");

                    b.HasKey("childDeptId");

                    b.ToTable("DeprtmentChilds");
                });

            modelBuilder.Entity("CrudeOperation.Models.EmpProject", b =>
                {
                    b.Property<int>("empProjectId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("empProjectId"));

                    b.Property<DateTime>("assignedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("empId")
                        .HasColumnType("int");

                    b.Property<string>("employeeName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("isActive")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("projectId")
                        .HasColumnType("int");

                    b.Property<string>("projectName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("role")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("empProjectId");

                    b.ToTable("EmpProjects");
                });

            modelBuilder.Entity("CrudeOperation.Models.Employee", b =>
                {
                    b.Property<int>("EmployeeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("EmployeeId"));

                    b.Property<string>("ContactNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("DeptID")
                        .HasColumnType("int");

                    b.Property<string>("EmailID")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EmployeeName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Gender")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("EmployeeId");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("CrudeOperation.Models.Leave", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Datad")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Message")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Result")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("Leaves");
                });

            modelBuilder.Entity("CrudeOperation.Models.Project", b =>
                {
                    b.Property<int>("projectId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("projectId"));

                    b.Property<string>("clientName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("contactNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("contactPerson")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("emailId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("leadByEmpId")
                        .HasColumnType("int");

                    b.Property<string>("projectName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("startDate")
                        .HasColumnType("datetime2");

                    b.HasKey("projectId");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("CrudeOperation.Models.User", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Token")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("role")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
