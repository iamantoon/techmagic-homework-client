import { inject, Injectable, signal } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { LoadingPopupComponent } from '../modals/loading-popup/loading-popup.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private busyRequestCount = 0;
  private modalService = inject(BsModalService);
  private bsModalRef?: BsModalRef<LoadingPopupComponent>;

  busy() {
    this.busyRequestCount++;
    if (this.busyRequestCount === 1) {
      const initialState: ModalOptions = {
        class: 'modal-sm',
      }
      this.bsModalRef = this.modalService.show(LoadingPopupComponent, initialState);
    }
  }

  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0 && this.bsModalRef) {
      this.busyRequestCount = 0;
      this.bsModalRef.hide();
      this.bsModalRef = undefined;
    }
  }
}