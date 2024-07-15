import { Component, inject, OnInit } from '@angular/core';
import { CarService } from '../../_services/car.service';
import { Car } from '../../_models/car.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RentCarModalComponent } from '../../modals/rent-car-modal/rent-car-modal.component';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [],
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.scss'
})
export class CarDetailComponent implements OnInit {
  private carService = inject(CarService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  private modalService = inject(BsModalService);
  public bsModalRef: BsModalRef<RentCarModalComponent> = new BsModalRef<RentCarModalComponent>();
  public car?: Car;

  ngOnInit(): void {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      const car = this.carService.cars().find(car => car._id === id);
      if (car) this.car = car;
      else this.carService.getCarById(id).subscribe(response => this.car = response);
    }
  }

  openRentCarModal(){
    if (!this.authService.currentUser()) {
      this.router.navigate(['/login']);
      return;
    }
    if (this.car){
      const initialState: ModalOptions = {
        class: 'modal-lg',
        initialState: {
          id: this.car._id,
          brand: this.car.brand,
          model: this.car.carModel,
          rentCost: this.car.rentCost,
          type: this.car.type,
          year: this.car.year
        }
      }
     this.bsModalRef = this.modalService.show(RentCarModalComponent, initialState);
    }
  }
}
