import { Component, inject, OnInit } from '@angular/core';
import { RentalService } from '../../_services/rental.service';
import { ReturnCarItemComponent } from '../return-car-item/return-car-item.component';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-return-car',
  standalone: true,
  imports: [ReturnCarItemComponent, NgFor, RouterLink],
  templateUrl: './return-car.component.html',
  styleUrl: './return-car.component.scss'
})
export class ReturnCarComponent implements OnInit {
  rentalService = inject(RentalService);

  ngOnInit(): void {
    this.rentalService.getActiveRentals();
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
