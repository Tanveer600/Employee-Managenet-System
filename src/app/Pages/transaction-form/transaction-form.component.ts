

import { Component, inject } from '@angular/core';
import { Account, Transaction } from '../../model/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../service/master.service';
import { Observable } from 'rxjs/internal/Observable';
import { FormBuilder, FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { provideToastr, ToastrService } from 'ngx-toastr'; // Import ToastrService
import { combineLatest } from 'rxjs';
@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [ReactiveFormsModule,AsyncPipe,RouterModule,CommonModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css'
})
export class TransactionFormComponent {
  Transactionform:FormGroup=new FormGroup({});
  isSubmitted = false;
accountList$:Observable<Account[]>=new Observable<[]>;
masterservice=inject(MasterService);
activateroute=inject(ActivatedRoute);
router=inject(Router)
constructor(private fb: FormBuilder,private toastr: ToastrService) {
  this.Transactionform = this.fb.group({
    id: [0],
    transactionDate: ['', Validators.required],
    accountId: ['', Validators.required],
    description: ['', Validators.required],
    debitAmount: ['', [Validators.required, Validators.min(1)]],
    creditAmount: ['', [Validators.required, Validators.min(1)]]
  });

  this.accountList$ = this.masterservice.getAccountdata();
  this.initializedForm();
  this.activateroute.params.subscribe((res:any)=>{
if(res.id !=0){
this.getalldata(res.id);
}
  });
}
initializedForm(data?: Transaction) {
  this.Transactionform = new FormGroup({
    id: new FormControl(data ? data.id : 0),
    transactionDate: new FormControl(data ? data.transactionDate : ''),
    accountId: new FormControl(data ? data.accountID : ''), // This should correctly bind to dropdown
    debitAmount: new FormControl(data ? data.debitAmount : ''),
    creditAmount: new FormControl(data ? data.creditAmount : ''),
    description: new FormControl(data ? data.description : ''),
  });
}


getalldata(id: number) {
  this.masterservice.getTransactionbyid(id).subscribe((res) => {
   if (res.transactionDate) {
  const dateObj = new Date(res.transactionDate);
  
  // Adjust for timezone difference to prevent shifting
  const localDate = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000);
  
  res.transactionDate = localDate.toISOString().split("T")[0]; // Convert to "YYYY-MM-DD"
}

    // Fetch account list and match the selected transaction's accountId
    this.accountList$.subscribe(accounts => {
      const selectedAccount = accounts.find(acc => +acc.id === +res.accountID); // Ensure numeric comparison

      console.log("Fetched Transaction Data:", res);
      console.log("Matched Account Name:", selectedAccount?.name);
      console.log("Matched Account ID:", selectedAccount?.id);

      // Ensure accountId is always a number
      this.initializedForm({
        ...res,
        accountID: selectedAccount ? Number(selectedAccount.id) : 0, // Ensure it's a number
      });
    });
  }, error => {
    alert("Error fetching transaction data");
  });
}





onAccountChange(event: any) {
  const selectedAccountId = event.target.value;
  this.accountList$.subscribe(accounts => {
    const selectedAccount = accounts.find(acc => acc.id == selectedAccountId);
    console.log('Selected Account:', selectedAccount);
  });
}

onSaveTransaction() {
  this.isSubmitted = true;

  if (this.Transactionform.invalid) {
    Object.values(this.Transactionform.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
    });
    return;
  }

  const formValue = this.Transactionform.value;

  this.accountList$.subscribe(accounts => {
    const selectedAccount = accounts.find(acc => acc.id == formValue.accountId);
    formValue.accountName = selectedAccount ? selectedAccount.name : '';

    this.masterservice.saveTransaction(formValue).subscribe(
      () => {
        this.toastr.success('Transaction Added Successfully!', 'Success'); // Success Toast
        this.router.navigateByUrl("Transaction");
        this.Transactionform.reset();
        this.isSubmitted = false;
      },
      () => {
        this.toastr.error('Failed to add transaction.', 'Error'); // Error Toast
      }
    );
  });
}








onupdateTransaction() {
  const formValue = this.Transactionform.value;

  this.masterservice.UpdateTransaction(formValue).subscribe(
    () => {
      this.toastr.success('Transaction Updated Successfully!', 'Success'); // Success Toast
      this.router.navigateByUrl("Transaction");
    },
    () => {
      this.toastr.error('Failed to update transaction.', 'Error'); // Error Toast
    }
  );
}
closeForm()
{
  this.isSubmitted = false;
  this.Transactionform.reset();
this.router.navigateByUrl('Transaction');
}
}




