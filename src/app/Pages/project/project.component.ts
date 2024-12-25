import { Component, inject, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Project } from '../../model/interface';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  
  projectlist:Project[]=[];
  //activateroute=inject(ActivatedRoute);
 // router=Inject(Router);
 // materservice = Inject(MasterService);
 constructor(private masterService: MasterService, private router: Router) {}

  ngOnInit(): void {
   this.getProdata();
  
  }
  getProdata() {
 // debugger;
  this.masterService.getProdata().subscribe((res: Project[]) => {
    //debugger;
    this.projectlist=res;
  });
};

onedit(id:number){
  this.router.navigate(['projectfrom',id]);
}

onDelete(id: number){
  const isDelete = confirm("Do you want to delete this data?");
  if (isDelete) {
    //debugger;
    this.masterService.deleteprojectbyid(id).subscribe(
      (res: any) => {
        alert("Record deleted successfully");
        this.getProdata();
      },
      (error: any) => {
        alert("An error occurred while deleting the record");
        console.error("Error:", error); // Log the error for debugging
      }
    );
  }
}
// updatesemp(){
  
//   this.masterService.UpdateeEployees().subscribe((res)=>{
//     debugger;
//     alert("employee updated");
//     this.getProdata();
//   },error=>{
// alert("error");
//   });
  
// }
}
