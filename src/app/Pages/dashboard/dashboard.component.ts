import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../model/interface';
import { Employee } from '../../model/Employee';
import { MasterService } from '../../service/master.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
projectlist$:Observable<Project[]>=new Observable<[]>;
Employeelist$:Observable<Employee[]>=new Observable<[]>;

constructor(private matserservice:MasterService){}
ngOnInit(): void {
  this.Employeelist$=this.matserservice.getAllEmployees();
  this.projectlist$=this.matserservice.getProdata();
}
}
