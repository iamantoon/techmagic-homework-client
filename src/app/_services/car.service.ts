import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Car, RentCar, ReturnCar } from '../_models/car.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5000/cars/';
  cars = signal<Car[]>([]);

  getCars() {
    return this.http.get<Car[]>(this.baseUrl).subscribe({
      next: response => this.cars.set(response)
    });
  }

  getCarById(id: string){
    return this.http.get<Car>(this.baseUrl + id);
  }

  rentCar(requestBody: RentCar) {
    return this.http.post(this.baseUrl + requestBody.carId + '/rent', requestBody);
  }

  returnCar(requestBody: ReturnCar){
    return this.http.post(this.baseUrl + 'return', requestBody);
  }
}
