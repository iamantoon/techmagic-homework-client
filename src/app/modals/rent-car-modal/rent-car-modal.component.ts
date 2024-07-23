import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { RentCar } from '../../_models/car.model';
import { AuthService } from '../../_services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePickerComponent } from '../../_forms/date-picker/date-picker.component';
import { Subscription } from 'rxjs';
import { CarService } from '../../_services/car.service';
import { ToastrService } from 'ngx-toastr';
import { NgIf, NgOptimizedImage } from '@angular/common'
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-rent-car-modal',
  standalone: true,
  imports: [ReactiveFormsModule, DatePickerComponent, NgOptimizedImage, NgIf],
  templateUrl: './rent-car-modal.component.html',
  styleUrl: './rent-car-modal.component.scss'
})
export class RentCarModalComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private carService = inject(CarService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  public rentForm: FormGroup = new FormGroup({});
  public minDate?: Date;
  bsModalRef = inject(BsModalRef);
  id?: string;
  brand: string = '';
  rentCost: number = 0;
  type: string = '';
  year: number = 0;
  photoUrl!: string;
  discount: number = 0;
  model: string = '';
  rentDays: number = 1;
  totalRentCost: number = 0;
  rentCostSubscription?: Subscription;
  isLoading = false;
  rentSubject = new Subject<void>();

  ngOnInit(): void {
    this.initializeForm();
    this.setMinDate();
    this.calculateRentCost();
    this.subscribeToDateChanges();
    this.rentSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(() => {
        if (this.id && this.authService.currentUser()) {
          const requestBody: RentCar = {
            expectedReturnDate: this.rentForm.controls['date'].value
          };
          return this.carService.rentCar(this.id, requestBody);
        }
        return [];
      })
    ).subscribe({
      next: _ => {
        this.carService.cars.update(value => value.filter(c => c._id !== this.id));
        this.toastr.success('Car rented successfully');
        this.router.navigate(['/cars']);
        this.bsModalRef.hide();
        this.isLoading = false;
      },
      error: err => {
        this.toastr.error('Failed to rent car');
        this.isLoading = false;
      }
    });
  }

  initializeForm() {
    this.rentForm = this.fb.group({
      date: ['', Validators.required],
    });
  }

  private calculateRentCost(): void {
    if (this.rentCost && this.rentForm.controls['date'].value) {
      const selectedDate = new Date(this.rentForm.controls['date'].value);
      const today = new Date();
      const timeDiff = Math.abs(selectedDate.getTime() - today.getTime());
      this.rentDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      this.totalRentCost = this.rentDays * this.rentCost;
    }
  }

  subscribeToDateChanges(): void {
    this.rentCostSubscription = this.rentForm.controls['date'].valueChanges.subscribe(() => {
      this.calculateRentCost();
    });
  }

  rent(): void {
    this.rentSubject.next();
  }

  /* rent(): void {
    if (this.id && this.authService.currentUser()){
      const requestBody: RentCar = {
        expectedReturnDate: this.rentForm.controls['date'].value
      }
      this.carService.rentCar(this.id, requestBody).subscribe(_ => {
        this.carService.cars.update(value => value.filter(c => c._id !== this.id));
        this.toastr.success('Car rented successfully');
        this.router.navigate(['/cars']);
        this.bsModalRef.hide();
      });
    }
  } */

  private setMinDate(){
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    this.minDate = tomorrow;
  }

  currencyFormatter(penalty: number): string {
    return penalty.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  ngOnDestroy(): void {
    this.rentCostSubscription?.unsubscribe();
  }
}