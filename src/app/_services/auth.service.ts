import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Account, User } from '../_models/user.model';
import { map } from 'rxjs';
import { Login, Register } from '../_models/auth.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient); 
  // private baseUrl = environment.apiUrl + 'auth/';
  private baseUrl = 'http://localhost:5000/auth/'
  currentUser = signal<User | null>(null);

  login(model: Login){
    return this.http.post<User>(this.baseUrl + 'login', model).pipe(
      map(user => {
        if (user) this.setCurrentUser(user);
        return user;
      })
    )
  }

  register(model: Register){
    return this.http.post<User>(this.baseUrl + 'register', model).pipe(
      map(user => {
        if (user) this.setCurrentUser(user);
        return user;
      })
    )
  }

  getAccountInfo(id: string){
    return this.http.get<Account>(this.baseUrl + id); // ?
  }

  setCurrentUser(user: User){
    this.currentUser.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout(){
    this.currentUser.set(null);
    localStorage.removeItem('user');
  }
}
