import { Component, inject } from '@angular/core';
import { Account, Transaction } from '../../model/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../service/master.service';
import { Observable } from 'rxjs/internal/Observable';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [ReactiveFormsModule,AsyncPipe,RouterModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css'
})
export class TransactionFormComponent {
  Transactionform:FormGroup=new FormGroup({});
accountList$:Observable<Account[]>=new Observable<[]>;
masterservice=inject(MasterService);
activateroute=inject(ActivatedRoute);
router=inject(Router)
constructor(){
  this.accountList$=this.masterservice.getAccountdata();
  this.initializedForm();
  this.activateroute.params.subscribe((res:any)=>{
if(res.id !=0){
this.getalldata(res.id);
}
  });
}
initializedForm(data?:Transaction) {
  this.Transactionform = new FormGroup({
    id: new FormControl(data ? data.id:0),
    transactionDate: new FormControl(data ? data.transactionDate:''),
    accountId: new FormControl(data ? data.accountId:''),
    debitAmount: new FormControl(data ? data.debitAmount:''),
    creditAmount: new FormControl(data ? data.creditAmount:''),
    description: new FormControl(data ? data.description:''),

  });
}
getalldata(id:number){

  this.masterservice.getTransactionbyid(id).subscribe((res)=>{
   // debugger;
    this.initializedForm(res);
  },error=>{
alert("error");
  }); 
}
onSaveTransaction(){
  //debugger;
  const formvalue=this.Transactionform.value;
  this.masterservice.saveTransaction(formvalue).subscribe((res)=>{
   // debugger;
    alert("Transaction Added");
    this.router.navigateByUrl("transaction-form");
    this.Transactionform.reset();
  },error=>{
alert("error");
  }); 
};
onupdateTransaction(){
 // debugger;
  const formvalue=this.Transactionform.value;
  this.masterservice.UpdateTransaction(formvalue).subscribe((res)=>{
   // debugger;
    alert("Transaction updated");
    this.router.navigateByUrl("transaction-form");
    
  },error=>{
alert("error");
  }); 
}
}
