import { Component } from '@angular/core';
import { Transaction } from '../../model/interface';
import { MasterService } from '../../service/master.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { provideToastr, ToastrService } from 'ngx-toastr'; // Import ToastrService
@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {
  transactionist:Transaction[]=[];

 constructor(private masterService: MasterService, private router: Router,private toastr:ToastrService) {}

  ngOnInit(): void {
   this.getTransactiondata();
  
  }
  getTransactiondata() {
    this.masterService.getTransactiondata().subscribe((res: Transaction[]) => {
        console.log("Fetched Transactions:", res); // Check API response

        this.masterService.getAccountdata().subscribe(accounts => {
            console.log("Fetched Accounts:", accounts); // Check fetched accounts

            this.transactionist = res.map(transaction => {
                console.log(`Processing Transaction ID: ${transaction.id}, Account ID: ${transaction.accountID}`);

                // Fix case sensitivity issue by using the exact API response field name
                const accountId = transaction.accountID; // Use 'accountID' (from API response)

                if (!accountId) {
                    console.warn(`Transaction ID ${transaction.id} has undefined accountID!`);
                }

                // Find account using corrected account ID
                const account = accounts.find(acc => +acc.id === +accountId);
                console.log(`Matched Account for Transaction ID ${transaction.id}:`, account);

                return {
                    ...transaction,
                    accountName: account ? account.name : 'Unknown' // Assign correct account name
                };
            });

            console.log("Final Transactions with Account Names:", this.transactionist);
        });
    });
}

  
formatDate(dateString: any): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB'); // "dd/MM/yyyy"
}

onedit(id:number){
  this.router.navigate(['transaction-form',id]);
}

onDelete(id: number){
  const isDelete = confirm("Do you want to delete this data?");
  if (isDelete) {
    //debugger;
    this.masterService.deletetransactionbyid(id).subscribe(
      (res: any) => {
        this.toastr.success('Record deleted successfully!', 'Success'); // Success Toast      
        this.getTransactiondata();
      },
      (error: any) => {
        this.toastr.error('Failed to delete  transaction.', 'Error'); // Error Toast
      }
    );
  }
}
}
