import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Car } from '../../_models/car.model';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { RentCarModalComponent } from '../../modals/rent-car-modal/rent-car-modal.component';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-car-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './car-item.component.html',
  styleUrl: './car-item.component.scss'
})
export class CarItemComponent {
  public car = input.required<Car>();
  private modalService = inject(BsModalService);
  private router = inject(Router);
  private authService = inject(AuthService);
  public bsModalRef: BsModalRef<RentCarModalComponent> = new BsModalRef<RentCarModalComponent>();

  openRentCarModal(){
    if (!this.authService.currentUser()) {
      this.router.navigate(['/login']);
      return;
    }
    const initialState: ModalOptions = {
      class: 'modal-md',
      initialState: {
        id: this.car()._id,
        brand: this.car().brand,
        model: this.car().carModel,
        rentCost: this.car().rentCost,
        photoUrl: this.car().photoUrl,
        discount: this.car().discount,
        type: this.car().type,
        year: this.car().year
      }
    }
    this.bsModalRef = this.modalService.show(RentCarModalComponent, initialState);
  }

  calculateInitialPrice(initialRentCost: number, discount: number): string {
    return this.currencyFormatter(initialRentCost + discount);
  }

  currencyFormatter(penalty: number): string {
    return penalty.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }
}
