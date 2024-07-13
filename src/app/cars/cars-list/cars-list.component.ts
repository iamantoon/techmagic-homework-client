import { Component, inject, OnInit } from '@angular/core';
import { CarItemComponent } from '../car-item/car-item.component';
import { CarService } from '../../_services/car.service';

@Component({
  selector: 'app-cars-list',
  standalone: true,
  imports: [CarItemComponent],
  templateUrl: './cars-list.component.html',
  styleUrl: './cars-list.component.scss'
})
export class CarsListComponent implements OnInit {
  public carService = inject(CarService);

  ngOnInit(): void {
    this.carService.getCars();
  }
}