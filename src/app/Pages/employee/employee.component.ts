import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { ChildDepartment, Department } from '../../model/interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../../model/Employee';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
isformvisible=signal<boolean>(false);
masterservice=inject(MasterService);
parentdeptlist = signal<Department[]>([]);
childdeptlist = signal<ChildDepartment[]>([]);
ParentDeprtID:number=0;
employeeform: Employee = new Employee();
employeelist=signal<Employee[]>([]);
constructor(private toastr:ToastrService,private router:Router){}
ngOnInit(): void {
  this.getparentdeprt();
  this.getEmployee();
 
}

getparentdeprt() {
 // debugger;
  this.masterservice.GetDepartments().subscribe((res: Department[]) => {
   // debugger;
    this.parentdeptlist.set(res); // Adjust based on actual structure
  });
}

onparentdeptchange() {
  console.log('ParentDeprtID:', this.ParentDeprtID); // Ensure ID is correctly set
  this.masterservice.GetchildDepartmentbyid(this.ParentDeprtID).subscribe((res) => {
    console.log('Child Departments Response:', res); // Check if response is valid
    this.childdeptlist.set(res || []); // Ensure the signal is updated
  }, (error) => {
    console.error('Error fetching child departments:', error);
  });
}

getEmployee() {
  this.masterservice.getAllEmployees().subscribe((res: Employee[]) => {
    this.employeelist.set(res);
  });
};

updatesemp() {
  this.masterservice.UpdateeEployees(this.employeeform).subscribe(
    (res: any) => {
      if (res?.success) { // Assuming API returns a success property
        this.toastr.success(res.message || 'Employee updated successfully', 'Success');
      } else {
        this.toastr.error(res.message || 'Failed to update employee', 'Error');
      }
      this.getEmployee(); // Refresh the employee list
    },
    (error) => {
      console.error('Error updating employee:', error);
      this.toastr.error('An error occurred while updating the employee', 'Error');
    }
  );
}

onDelete(id: number) {
  const isDelete = confirm("Do you want to delete this data?");
  if (isDelete) {
    this.masterservice.deleteEployeebyid(id).subscribe(
      (res: any) => {
        console.log('Delete Response:', res); // Log response for debugging
        if (res && res.success) {
          this.toastr.success(res.message || 'Record deleted successfully', 'Success');
        } else if (res && res.message) {
          this.toastr.error(res.message, 'Error');
        } else {
          this.toastr.error('No response from server', 'Error');
        }
        this.getEmployee(); // Refresh the employee list
      },
      (error) => {
        console.error('Error deleting employee:', error);
        this.toastr.error('An error occurred while deleting the record', 'Error');
      }
    );
  }
}


//formVlue:any;
onSubmit() {

  this.masterservice.saveemp(this.employeeform).subscribe(
    (res: any) => {
      if (res) { // Check if a response object is returned
        this.toastr.success('Employee added successfully', 'Success');
        this.getEmployee(); // Refresh the employee list
      } else {
        this.toastr.error('Failed to add employee', 'Error');
      }
    },
    (error) => {
      console.error('API Error:', error);
      this.toastr.error('An error occurred while adding the employee', 'Error');
    }
  );
}
  
onedit(data: Employee) {
  this.employeeform = { ...data };  // Ensure employeeform is correctly populated with data
  this.ParentDeprtID = data.deptID; // Set the ParentDeprtID as well
  this.isformvisible.set(true);
  this.onparentdeptchange(); // Refresh child departments after setting the parent department ID
}

getDepartmentName(departmentId: number): string {
  const department = this.parentdeptlist().find(d => d.departmentId === departmentId);
  if (department) {
    return department.departmentName; // Return the name of the parent department
  }
  
  // If it's not found in parent, check in the child departments
  const childDepartment = this.childdeptlist().find(c => c.childDeptId === departmentId);
  if (childDepartment) {
    return childDepartment.departmentName;
  }

  return 'Unknown Department'; // If no department matches
}




}