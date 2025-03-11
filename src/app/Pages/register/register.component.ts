import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpproService } from '../../service/emppro.service';
import { UserRegister } from '../../model/interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent  {
  Registerform = {
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  constructor(private masterservice: EmpproService, private toastr: ToastrService, private router: Router) {}

  OnRegister() {
    if (!this.Registerform.userName || !this.Registerform.email || !this.Registerform.password) {
      this.toastr.error('Please fill all required fields.', 'Error');
      return;
    }
    debugger;
    this.masterservice.saveUser(this.Registerform).subscribe(
      () => {
        this.toastr.success('User Registered Successfully!', 'Success');
        this.router.navigateByUrl('/login');
      },
      () => {
        this.toastr.error('Registration failed. Try again.', 'Error');
      }
    );
  }
}
