import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CarService } from '../../_services/car.service';
import { CarInfo } from '../../_models/rental.model';
import { ReturnCar } from '../../_models/car.model';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../_services/auth.service';
import { RadioButtonComponent } from '../../_forms/radio-button/radio-button.component';

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
  private fb = inject(FormBuilder);
  radioButtonOptions: string[] = ['Yes', 'No'];
  rentalForm: FormGroup = new FormGroup({});
  bsModalRef = inject(BsModalRef);
  car?: CarInfo;
  rentalId!: string;
  startDate?: Date;
  totalRentalCost?: number;
  penalty?: number;
  discount?: number;
  expectedReturnDate!: Date;
  actualReturnDate!: Date;

  ngOnInit(): void {
    this.initializeForm();
    this.returnCar();
    this.actualReturnDate = new Date();
  }

  initializeForm(){
    this.rentalForm = this.fb.group({
      carDamaged: ["No", Validators.required]
    });
  }

  returnCar(){
    const requestBody: ReturnCar = {
      rentalId: this.rentalId,
      userId: this.authService.currentUser()!.id,
      isDamaged: this.rentalForm.controls['carDamaged'].value
    }
    this.carService.returnCar(requestBody).subscribe({
      next: response => {
        console.log(response);
        this.bsModalRef.hide();
      }
    })
  }

  calculateDamagePenalty(){
    return this.rentalForm.controls['carDamaged'].value === 'Yes' ? 200 : 0;
  }

  calculateLateReturnPenalty(): number {
    if (this.actualReturnDate > this.expectedReturnDate) {
			const lateDays = (this.actualReturnDate.getTime() - this.expectedReturnDate.getTime()) / (1000 * 3600 * 24);
			return lateDays * 50;
		}
    return 0;
  }

  calculateTotalPenalty(): number {
		let penalty = 0;
		if (this.actualReturnDate > this.expectedReturnDate) {
			const lateDays = (this.actualReturnDate.getTime() - this.expectedReturnDate.getTime()) / (1000 * 3600 * 24);
			penalty += lateDays * 50;
		}
		if (this.rentalForm.controls['carDamaged'].value === 'Yes') penalty += 200;

		return penalty;
	}
}
