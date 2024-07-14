import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rental } from '../_models/rental.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  // private baseUrl = environment.apiUrl + 'cars/';
  private baseUrl = 'http://localhost:5000/rentals/';
  private http = inject(HttpClient);
  activeRentals = signal<Rental[]>([]);

  getPreviousRentals(){
    return this.http.get<Rental[]>(this.baseUrl);
  }

  getActiveRentals(){
    return this.http.get<Rental[]>(this.baseUrl + 'active').subscribe({
      next: response => this.activeRentals.set(response)
    })
  }
}
