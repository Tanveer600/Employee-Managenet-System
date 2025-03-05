import { Component, inject } from '@angular/core';
import { Account } from '../../model/interface';
import { Observable } from 'rxjs/internal/Observable';
import { MasterService } from '../../service/master.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [RouterModule,AsyncPipe,ReactiveFormsModule],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.css'
})
export class AccountFormComponent {
Accountform:FormGroup=new FormGroup({});
transList$:Observable<Account[]>=new Observable<[]>;
masterservice=inject(MasterService);
activateroute=inject(ActivatedRoute);
router=inject(Router)
constructor(){
  this.transList$=this.masterservice.getAccountdata();
  this.initializedForm();
  this.activateroute.params.subscribe((res:any)=>{
if(res.id !=0){
this.getalldata(res.id);
}
  });
}
initializedForm(data?:Account) {
  this.Accountform = new FormGroup({
    id: new FormControl(data ? data.id:0),
    name: new FormControl(data ? data.name:''),
    accountType: new FormControl(data ? data.accountType:''),
    

  });
}
getalldata(id:number){

  this.masterservice.getAccountbyid(id).subscribe((res)=>{
   // debugger;
    this.initializedForm(res);
  },error=>{
alert("error");
  }); 
}
onSaveAccount(){
  //debugger;
  const formvalue=this.Accountform.value;
  this.masterservice.saveAccount(formvalue).subscribe((res)=>{
   // debugger;
    alert("aacount Added");
    this.router.navigateByUrl("account");
    this.Accountform.reset();
  },error=>{
alert("error");
  }); 
};
onupdateAccount(){
 // debugger;
  const formvalue=this.Accountform.value;
  this.masterservice.UpdateAccount(formvalue).subscribe((res)=>{
   // debugger;
    alert("Account updated");
    this.router.navigateByUrl("account");
    
  },error=>{
alert("error");
  }); 
}
}
