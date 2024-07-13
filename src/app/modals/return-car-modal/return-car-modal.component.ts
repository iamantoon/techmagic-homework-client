import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CarService } from '../../_services/car.service';
import { CarInfo } from '../../_models/rental.model';
import { ReturnCar } from '../../_models/car.model';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-return-car-modal',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './return-car-modal.component.html',
  styleUrl: './return-car-modal.component.scss'
})
export class ReturnCarModalComponent implements OnInit {
  private carService = inject(CarService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  rentalForm: FormGroup = new FormGroup({});
  bsModalRef = inject(BsModalRef);
  car?: CarInfo;
  rentalId!: string;
  startDate?: Date;
  totalRentalCost?: number;
  penalty?: number;
  discount?: number;
  expectedReturnDate?: Date;
  actualReturnDate?: Date;

  ngOnInit(): void {
    this.initializeForm();
    this.returnCar();
    this.actualReturnDate = new Date();
  }

  initializeForm(){
    this.rentalForm = this.fb.group({
      carDamaged: ['no', Validators.required]
    });
  }

  returnCar(){
    const requestBody: ReturnCar = {
      rentalId: this.rentalId,
      userId: this.authService.currentUser()!.id,
      isDamaged: this.rentalForm.controls['carDamaged'].value
    }
    this.carService.returnCar(requestBody).subscribe({
      next: response => console.log(response)
    })
  }
}
