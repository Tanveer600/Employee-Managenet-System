import { Component, OnInit, signal } from '@angular/core';
import { EmpPro } from '../../model/emppro';
import { EmpproService } from '../../service/emppro.service';
import { Employee } from '../../model/Employee';
import { Observable } from 'rxjs';
import { MasterService } from '../../service/master.service';
import { Project } from '../../model/interface';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-project',
  standalone: true,
  imports: [AsyncPipe,FormsModule],
  templateUrl: './employee-project.component.html',
  styleUrl: './employee-project.component.css'
})
export class EmployeeProjectComponent implements OnInit {
employeeprojectform: EmpPro = new EmpPro();
projectlist$:Observable<Project[]>=new Observable<[]>;
Employeelist$:Observable<Employee[]>=new Observable<[]>;
//empproservice=signal(EmpproService)
employeerpojectlist=signal<EmpPro[]>([]);
constructor(private empproservice:EmpproService,private matserservice:MasterService,private router:Router){}
ngOnInit(): void {
  this.Employeelist$=this.matserservice.getAllEmployees();
  this.projectlist$=this.matserservice.getProdata();
  this.getEmployeeproject();
};
getEmployeeproject() {
  this.empproservice.getAllEmpPro().subscribe((res: EmpPro[]) => {
    this.employeerpojectlist.set(res);
  });
};

//formVlue:any;
onSubmit() {

  this.empproservice.saveemppro(this.employeeprojectform).subscribe((res)=>{
    debugger;
    console.info("employee-project added successfully");
  
  })
};
updatesemp(){
  this.empproservice.UpdateeEployeeProject(this.employeeprojectform).subscribe((res)=>{
    debugger;
    alert("employee updated");
    this.getEmployeeproject();
  },error=>{
alert("error");
  });
  
}
onedit(data:EmpPro){
  this.employeeprojectform=data;
  //this.isformvisible.set(true);
}

onDelete(id: number){
  const isDelete = confirm("Do you want to delete this data?");
  if (isDelete) {
    debugger;
    this.empproservice.deleteEployeeProjectbyid(id).subscribe(
      (res: any) => {
        alert("Record deleted successfully");
        this.getEmployeeproject();
      },
      (error: any) => {
        alert("An error occurred while deleting the record");
        console.error("Error:", error); // Log the error for debugging
      }
    );
  }
}
}
