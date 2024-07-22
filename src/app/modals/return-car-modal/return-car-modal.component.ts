import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CarService } from '../../_services/car.service';
import { CarInfo } from '../../_models/rental.model';
import { ReturnCar } from '../../_models/car.model';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../_services/auth.service';
import { RadioButtonComponent } from '../../_forms/radio-button/radio-button.component';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from '../../_services/rental.service';

@Component({
  selector: 'app-return-car-modal',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, RadioButtonComponent],
  templateUrl: './return-car-modal.component.html',
  styleUrl: './return-car-modal.component.scss'
})
export class ReturnCarModalComponent implements OnInit {
  private carService = inject(CarService);
  private authService = inject(AuthService);
  private rentalService = inject(RentalService);
  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);
  public radioButtonOptions: string[] = ['Yes', 'No'];
  public rentalForm: FormGroup = new FormGroup({});
  public bsModalRef = inject(BsModalRef);
  car!: CarInfo;
  carId!: string;
  rentalId!: string;
  startDate?: Date;
  totalRentalCost?: number;
  penalty?: number;
  discount?: number;
  expectedReturnDate!: Date;
  actualReturnDate!: Date;

  ngOnInit(): void {
    this.initializeForm();
    this.actualReturnDate = new Date();
  }

  initializeForm(){
    this.rentalForm = this.fb.group({
      carDamaged: ['No', Validators.required]
    });
  }

  returnCar(){
    const requestBody: ReturnCar = {
      rentalId: this.rentalId,
      isDamaged: this.rentalForm.controls['carDamaged'].value === 'Yes' ? true : false
    };
    this.carService.returnCar(this.carId, requestBody).subscribe({
      next: _ => {
        this.toastr.success('Car returned successfully');
        this.rentalService.activeRentals.update(value => value.filter(r => r._id !== this.rentalId));
        this.bsModalRef.hide();
      },
      error: _ => {
        this.toastr.error('Something went wrong');
        this.bsModalRef.hide();
      }
    })
  }

  calculateDamagePenalty(){
    return this.rentalForm.controls['carDamaged'].value === 'Yes' ? this.currencyFormatter(200) : this.currencyFormatter(0);
  }

  calculateLateReturnPenalty(): string {
    if (this.actualReturnDate > this.expectedReturnDate) {
			const lateDays = (this.actualReturnDate.getTime() - this.expectedReturnDate.getTime()) / (1000 * 3600 * 24);
      const formattedPenalty = this.currencyFormatter(lateDays * 50);
			return formattedPenalty;
		}
    return this.currencyFormatter(0);
  }

  calculateTotalPenalty(): string {
		let penalty = 0;
		if (this.actualReturnDate > this.expectedReturnDate) {
			const lateDays = (this.actualReturnDate.getTime() - this.expectedReturnDate.getTime()) / (1000 * 3600 * 24);
			penalty += lateDays * 50;
		}
		if (this.rentalForm.controls['carDamaged'].value === 'Yes') penalty += 200;

    const formattedPenalty = this.currencyFormatter(penalty);

		return formattedPenalty;
	}

  private currencyFormatter(penalty: number): string {
    return penalty.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }
}
