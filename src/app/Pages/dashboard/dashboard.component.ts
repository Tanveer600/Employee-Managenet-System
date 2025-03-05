import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Account, Project, Transaction } from '../../model/interface';
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
  accountList$:Observable<Account[]>=new Observable<[]>;
  transactionist$:Observable<Transaction[]>=new Observable<[]>;

constructor(private matserservice:MasterService){}
ngOnInit(): void {
  this.transactionist$=this.matserservice.getTransactiondata();
  this.accountList$=this.matserservice.getAccountdata();
}
}
