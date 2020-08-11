import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PagesAfiliadosComponent } from './pages/afiliados/pages-afiliados.component';



const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'afiliados', component: PagesAfiliadosComponent },
    { path: '**', component: HomeComponent },
];


export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
