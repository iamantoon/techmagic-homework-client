import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { AccountInfo } from '../../_models/user.model';
import { DatePipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [JsonPipe, DatePipe],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  private authService = inject(AuthService);
  public accountInfo?: AccountInfo;

  ngOnInit(): void {
    this.authService.getAccountInfo(this.authService.currentUser()!.id).subscribe({
      next: response => this.accountInfo = response
    });
  }

  calculateDiscount(totalRents: number): string {
    const discountRate = Math.min(20, Math.floor(totalRents / 5) * 5);
    const averageRentalCost = 50;
		const sum = (discountRate / 100) * averageRentalCost;
    return this.currencyFormatter(sum);
  }

  currencyFormatter(penalty: number): string {
    return penalty.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }
}
