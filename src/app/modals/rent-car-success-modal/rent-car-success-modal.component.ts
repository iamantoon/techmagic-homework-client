import { Component, inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-rent-car-success-modal',
  standalone: true,
  imports: [],
  templateUrl: './rent-car-success-modal.component.html',
  styleUrl: './rent-car-success-modal.component.scss'
})
export class RentCarSuccessModalComponent {
  private bsModalRef = inject(BsModalRef);

  close(){
    this.bsModalRef.hide();
  }
}
