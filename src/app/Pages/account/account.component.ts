import { Component } from '@angular/core';
import { Account } from '../../model/interface';
import { MasterService } from '../../service/master.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
 accountList:Account[]=[];

 constructor(private masterService: MasterService, private router: Router) {}

  ngOnInit(): void {
   this.getProdata();
  
  }
  getProdata() {
 // debugger;
  this.masterService.getAccountdata().subscribe((res: Account[]) => {
    //debugger;
    this.accountList=res;
  });
};

onedit(id:number){
  this.router.navigate(['account-form',id]);
}

onDelete(id: number){
  const isDelete = confirm("Do you want to delete this data?");
  if (isDelete) {
    //debugger;
    this.masterService.deleteACCOUNTbyid(id).subscribe(
      (res: any) => {
        alert("Account deleted successfully");
        this.getProdata();
      },
      (error: any) => {
        alert("An error occurred while deleting the record");
        console.error("Error:", error); // Log the error for debugging
      }
    );
  }
}
}
