import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from './auth.service';
import { LoginRequest } from './login-request';
import { LoginResponse } from './login-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterLink,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: UntypedFormGroup;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    const loginRequest: LoginRequest = {
      username: this.form.controls['userName'].value,
      password: this.form.controls['password'].value,
    };

    this.authService.login(loginRequest).subscribe({
      next: (result) => {
        if (result.success) {
          localStorage.setItem('tokenValue', result.token);
          this.errorMessage = '';
          this.router.navigate(['/movies']);
        } else {
          this.errorMessage = 'Invalid username or password.';
        }
      },
      error: (e) => {
        console.error('Login failed:', e);
        this.errorMessage = 'Not Authorized: invalid credentials. Try again.';
      },
    });
  }
}
