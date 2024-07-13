import { Component, inject } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, BsDropdownModule, TitleCasePipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  private router = inject(Router);
  public authService = inject(AuthService);

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
