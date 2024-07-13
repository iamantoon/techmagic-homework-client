import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CarsListComponent } from './cars/cars-list/cars-list.component';
import { CarDetailComponent } from './cars/car-detail/car-detail.component';
import { RentalsComponent } from './rentals/rentals.component';
import { ReturnCarComponent } from './rentals/return-car/return-car.component';
import { AccountComponent } from './auth/account/account.component';
import { authGuard } from './_guards/auth.guard';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'cars', component: CarsListComponent},
    {path: 'cars/:id', component: CarDetailComponent},
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            {path: 'rentals', component: RentalsComponent},
            {path: 'rentals/return-car', component: ReturnCarComponent},
            {path: 'account', component: AccountComponent}
        ]
    },
    {path: '**', component: HomeComponent, pathMatch: 'full'}
];
