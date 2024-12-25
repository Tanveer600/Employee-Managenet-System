import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  Onlogin() {
    this.serviceuser.login(this.loginobj).subscribe(
      (res: any) => {
        if (res.success) {
          this.toastr.success(res.message, 'Success');
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
