import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { EmpproService } from '../../service/emppro.service';
import { User } from '../../model/interface';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginobj: User = {
    userName: '',
    password: '',
  };

  constructor(
    private router: Router,
    private serviceuser: EmpproService,
    private toastr: ToastrService
  ) {}

  Onlogin(form: any) {
    if (form.invalid) {
      // Mark all form controls as touched to show validation messages
      form.control.markAllAsTouched();
      return;
    }
  
    this.serviceuser.login(this.loginobj).subscribe(
      (res: any) => {
        if (res.success) {
          this.toastr.success(res.message, 'Success');
  
          // Clear input fields after successful login
          this.loginobj = {
            userName: '',
            password: '',
          };
  
          form.resetForm(); // Reset form fields
  
          this.router.navigateByUrl('dashboard');
        } else {
          this.toastr.error(res.message, 'Error');
        }
      },
      (error) => {
        console.error('Login error:', error);
        this.toastr.error('An error occurred during login. Please try again.', 'Error');
      }
    );
  }
  
}
