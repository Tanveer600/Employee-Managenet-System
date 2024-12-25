import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../../model/Employee';
import { MasterService } from '../../service/master.service';
import { AsyncPipe } from '@angular/common';
import { Project } from '../../model/interface';

@Component({
  selector: 'app-projectform',
  standalone: true,
  imports: [ReactiveFormsModule,AsyncPipe],
  templateUrl: './projectform.component.html',
  styleUrl: './projectform.component.css'
})
export class ProjectformComponent {
projectform:FormGroup=new FormGroup({});
emplist$:Observable<Employee[]>=new Observable<[]>;
masterservice=inject(MasterService);
activateroute=inject(ActivatedRoute);
router=inject(Router)
constructor(){
  this.emplist$=this.masterservice.getAllEmployees();
  this.initializedForm();
  this.activateroute.params.subscribe((res:any)=>{
if(res.id !=0){
this.getalldata(res.id);
}
  });
}
initializedForm(data?:Project) {
  this.projectform = new FormGroup({
    projectId: new FormControl(data ? data.projectId:0),
    projectName: new FormControl(data ? data.projectName:''),
    clientName: new FormControl(data ? data.clientName:''),
    startDate: new FormControl(data ? data.startDate:''),
    leadByEmpId: new FormControl(data ? data.leadByEmpId:''),
    contactPerson: new FormControl(data ? data.contactPerson:''),
    contactNo: new FormControl(data ? data.contactNo:''),
    emailId: new FormControl(data ? data.emailId:'')
  });
}
getalldata(id:number){

  this.masterservice.getprojectbyid(id).subscribe((res)=>{
   // debugger;
    this.initializedForm(res);
  },error=>{
alert("error");
  }); 
}
onSaveProject(){
  //debugger;
  const formvalue=this.projectform.value;
  this.masterservice.savepro(formvalue).subscribe((res)=>{
   // debugger;
    alert("project Added");
    this.router.navigateByUrl("project");
    this.projectform.reset();
  },error=>{
alert("error");
  }); 
};
onupdate(){
 // debugger;
  const formvalue=this.projectform.value;
  this.masterservice.Updateeproject(formvalue).subscribe((res)=>{
   // debugger;
    alert("project updated");
    this.router.navigateByUrl("project");
    
  },error=>{
alert("error");
  }); 
}
}
