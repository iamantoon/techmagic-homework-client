import { Component, inject, OnInit, signal } from '@angular/core';
import { RentalService } from '../_services/rental.service';
import { Rental } from '../_models/rental.model';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rentals',
  standalone: true,
  imports: [DatePipe, TitleCasePipe, RouterLink],
  templateUrl: './rentals.component.html',
  styleUrl: './rentals.component.scss'
})
export class RentalsComponent implements OnInit {
  private rentalService = inject(RentalService);
  public returnedCars: Rental[] = [];

  ngOnInit(): void {
    this.rentalService.getPreviousRentals().subscribe({
      next: response => this.returnedCars = response
    });
  }

  currencyFormatter(penalty: number): string {
    return penalty.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }
}