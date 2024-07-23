import { Component, inject, input } from '@angular/core';
import { Rental } from '../../_models/rental.model';
import { DatePipe } from '@angular/common';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ReturnCarModalComponent } from '../../modals/return-car-modal/return-car-modal.component';

@Component({
  selector: 'app-return-car-item',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './return-car-item.component.html',
  styleUrl: './return-car-item.component.scss'
})
export class ReturnCarItemComponent {
  public rental = input.required<Rental>();
  private modalService = inject(BsModalService);
  public bsModalRef: BsModalRef<ReturnCarModalComponent> = new BsModalRef<ReturnCarModalComponent>();

  openReturnCarModal(){
    const initialState: ModalOptions = {
      class: 'modal-md',
      initialState: {
        rentalId: this.rental()._id,
        brand: this.rental().car.brand,
        model: this.rental().car.carModel,
        rentCost: this.rental().finalRentalCost,
        startDate: this.rental().startDate,
        expectedReturnDate: this.rental().expectedReturnDate,
        carId: this.rental().carId
      }
    }
    this.bsModalRef = this.modalService.show(ReturnCarModalComponent, initialState);
  }
}
