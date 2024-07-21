import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CarsListComponent } from './cars/cars-list/cars-list.component';
import { CarDetailComponent } from './cars/car-detail/car-detail.component';
import { RentalsComponent } from './rentals/rentals.component';
import { ReturnCarComponent } from './rentals/return-car/return-car.component';
import { authGuard } from './_guards/auth.guard';
import { AccountComponent } from './auth/account/account.component';

export const routes: Routes = [
    { path: 'login', title: 'Login', component: LoginComponent },
    { path: 'register', title: 'Register', component: RegisterComponent },
    { path: 'cars/:id', title: 'Cars', component: CarDetailComponent },
    { path: 'cars', title: 'Cars', component: CarsListComponent },
    { path: '', redirectTo: 'cars', pathMatch: 'full' },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: 'rentals', title: 'Closed rents', component: RentalsComponent },
            { path: 'rentals/active', title: 'Active rents', component: ReturnCarComponent },
            { path: 'account', title: 'My account', component: AccountComponent }
        ]
    },
    { path: '**', redirectTo: 'cars', pathMatch: 'full' }
];
