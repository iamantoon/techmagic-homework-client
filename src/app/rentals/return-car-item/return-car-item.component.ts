import { Component, inject, input } from '@angular/core';
import { Rental } from '../../_models/rental.model';
import { DatePipe } from '@angular/common';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { RentalService } from '../../_services/rental.service';
import { ReturnCarModalComponent } from '../../modals/return-car-modal/return-car-modal.component';

@Component({
  selector: 'app-return-car-item',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './return-car-item.component.html',
  styleUrl: './return-car-item.component.scss'
})
export class ReturnCarItemComponent {
  rental = input.required<Rental>();
  private modalService = inject(BsModalService);
  bsModalRef: BsModalRef<ReturnCarModalComponent> = new BsModalRef<ReturnCarModalComponent>();

  openReturnCarModal(){
    const initialState: ModalOptions = {
      class: 'modal-lg',
      initialState: {
        id: this.rental()._id,
        brand: this.rental().car.brand,
        model: this.rental().car.carModel,
        rentCost: this.rental().finalRentalCost,
        startDate: this.rental().startDate
      }
    }
    this.bsModalRef = this.modalService.show(ReturnCarModalComponent, initialState);
  }
}
