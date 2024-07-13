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
  car = input.required<Car>();
  private modalService = inject(BsModalService);
  private router = inject(Router);
  private authService = inject(AuthService);
  bsModalRef: BsModalRef<RentCarModalComponent> = new BsModalRef<RentCarModalComponent>();

  openRentCarModal(){
    if (!this.authService.currentUser()) this.router.navigate(['/login']);
    const initialState: ModalOptions = {
      class: 'modal-lg',
      initialState: {
        id: this.car()._id,
        brand: this.car().brand,
        rentCost: this.car().rentCost,
        type: this.car().type,
        manufactureYear: this.car().year,
        model: this.car().carModel
      }
    }
    this.bsModalRef = this.modalService.show(RentCarModalComponent, initialState);
  }
}
