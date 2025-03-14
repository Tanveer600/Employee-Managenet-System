import { Component } from '@angular/core';
import { Account } from '../../model/interface';
import { MasterService } from '../../service/master.service';
import { Router, RouterModule } from '@angular/router';
import { provideToastr, ToastrService } from 'ngx-toastr'; // Import ToastrService
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
 accountList:Account[]=[];

 constructor(private masterService: MasterService, private router: Router,private toastr:ToastrService) {}

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
        this.toastr.success('Record deleted successfully!', 'Success'); // Success Toast  
        this.getProdata();
      },
      (error: any) => {
        this.toastr.error('Failed to delete account!', 'Error'); // Success Toast  
        console.error("Error:", error); // Log the error for debugging
      }
    );
  }
}
}
