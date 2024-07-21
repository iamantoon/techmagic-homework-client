import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TextInputComponent } from '../../_forms/text-input/text-input.component';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../_services/auth.service';
import { Register } from '../../_models/auth.model';
import { ToastrService } from 'ngx-toastr';
import { RadioButtonComponent } from '../../_forms/radio-button/radio-button.component';
import { DatePickerComponent } from '../../_forms/date-picker/date-picker.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, TextInputComponent, RouterLink, DatePickerComponent, RadioButtonComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  public registerForm: FormGroup = new FormGroup({});
  private passwordSubscription?: Subscription;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      patronymic: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\+?3?8?(0\d{9})$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });
    this.passwordSubscription = this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {isMatching: true}
    }
  }

  register(){
    if (this.registerForm.valid) {
      const formValue: Register = this.registerForm.value;
      this.authService.register(formValue).subscribe({
        next: _ => {
          this.toastr.success('You have successfully registered');
          this.router.navigate(['/']);
        },
        error: err => this.toastr.error(err)
      });
    } 
  }

  ngOnDestroy(): void {
    this.passwordSubscription?.unsubscribe();
  }
}
