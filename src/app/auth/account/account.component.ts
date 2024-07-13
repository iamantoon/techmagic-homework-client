import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Account } from '../../_models/user.model';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  private authService = inject(AuthService);
  accountInfo?: Account;

  ngOnInit(): void {
    const id = this.authService.currentUser()?.id;
    if (id){
      this.authService.getAccountInfo(id).subscribe({
        next: response => this.accountInfo = response
      })
    }
  }
}