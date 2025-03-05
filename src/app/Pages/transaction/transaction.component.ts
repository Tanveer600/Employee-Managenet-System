import { Component } from '@angular/core';
import { Transaction } from '../../model/interface';
import { MasterService } from '../../service/master.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {
  transactionist:Transaction[]=[];

 constructor(private masterService: MasterService, private router: Router) {}

  ngOnInit(): void {
   this.getTransactiondata();
  
  }
  getTransactiondata() {
 // debugger;
  this.masterService.getTransactiondata().subscribe((res: Transaction[]) => {
    //debugger;
    this.transactionist=res;
  });
};

onedit(id:number){
  this.router.navigate(['transaction-form',id]);
}

onDelete(id: number){
  const isDelete = confirm("Do you want to delete this data?");
  if (isDelete) {
    //debugger;
    this.masterService.deletetransactionbyid(id).subscribe(
      (res: any) => {
        alert("Record deleted successfully");
        this.getTransactiondata();
      },
      (error: any) => {
        alert("An error occurred while deleting the record");
        console.error("Error:", error); // Log the error for debugging
      }
    );
  }
}
}
