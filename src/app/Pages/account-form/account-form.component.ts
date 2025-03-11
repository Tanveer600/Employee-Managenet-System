import { Component, inject } from '@angular/core';
import { Account } from '../../model/interface';
import { Observable } from 'rxjs/internal/Observable';
import { MasterService } from '../../service/master.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { provideToastr, ToastrService } from 'ngx-toastr'; // Import ToastrService
@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [RouterModule,AsyncPipe,ReactiveFormsModule,CommonModule],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.css'
})
export class AccountFormComponent {
Accountform:FormGroup=new FormGroup({});
isSubmitted = false;
transList$:Observable<Account[]>=new Observable<[]>;
masterservice=inject(MasterService);
activateroute=inject(ActivatedRoute);
isFormVisible: boolean = true; // Track form visibility
router=inject(Router)
constructor(private fb: FormBuilder,private toastr:ToastrService){
   this.Accountform = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      accountType: ['', Validators.required],
    
    });
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
onSaveAccount() {
  this.isSubmitted = true;

  if (this.Accountform.invalid) {
    Object.values(this.Accountform.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
    });
    return;
  }

  const formValue = this.Accountform.value;



    this.masterservice.saveAccount(formValue).subscribe(
      () => {
        this.toastr.success('Transaction Added Successfully!', 'Success'); // Success Toast
        this.router.navigateByUrl("account");
        this.Accountform.reset();
        this.isSubmitted = false;
      },
      () => {
        this.toastr.error('Failed to add transaction.', 'Error'); // Error Toast
      }
    );
  
}







onupdateAccount(){
 // debugger;
  const formvalue=this.Accountform.value;
  this.masterservice.UpdateAccount(formvalue).subscribe((res)=>{
   // debugger;
   this.toastr.success('Accont updated Successfully!', 'Success'); // Success Toast
    
    this.router.navigateByUrl("account");
    
  },error=>{
    this.toastr.error('Failed to update account.', 'Error'); // Error Toast
  }); 
}
  // Close form and navigate back
  closeForm() {
    this.router.navigateByUrl("account"); // Redirect to table
}
}
