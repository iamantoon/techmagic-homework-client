import { NgIf } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { LoadingService } from '../../_services/loading.service';

@Component({
  selector: 'app-loading-popup',
  standalone: true,
  imports: [NgIf],
  templateUrl: './loading-popup.component.html',
  styleUrl: './loading-popup.component.scss'
})
export class LoadingPopupComponent {
  color = input<'primary' | 'secondary'>('primary');
  title = input<string>('Loading');
  message = input<string>('We are loading what you want to see');
  private loadingService = inject(LoadingService);
  bsModalRef = inject(BsModalRef);
}