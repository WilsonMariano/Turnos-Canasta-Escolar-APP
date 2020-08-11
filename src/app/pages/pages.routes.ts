import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';



const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'registro', component: RegistroComponent },
    { path: '**', component: HomeComponent }
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes , { useHash: true });

