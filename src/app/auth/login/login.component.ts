import { Component, inject, OnInit } from '@angular/core';
import { TextInputComponent } from '../../_forms/text-input/text-input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PhoneFormatterDirective } from '../../_directives/phone-formatter.directive';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, TextInputComponent, RouterLink, PhoneFormatterDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  loginForm: FormGroup = new FormGroup({});
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^\+?3?8?(0\d{9})$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      this.authService.login(formValue).subscribe({
        next: _ => this.router.navigate(['/']),
        error: err => console.error('Login error:', err)
      });
    } 
  }
}
