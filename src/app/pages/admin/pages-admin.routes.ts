import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from 'src/app/services/auth/auth-guard.service';


import { PagesAdminComponent } from './pages-admin.component';
import { LoginComponent } from './login/login.component';
import { GrillaSolicitudesComponent } from './grilla-solicitudes/grilla-solicitudes.component';
import { SolicitudComponent } from './solicitud/solicitud.component';


const pagesRoutes: Routes = [
    {
        path: 'admin',
        component: PagesAdminComponent,
        children: [
            { path: '',                             redirectTo: '/login',                   pathMatch: 'full'                            },
            { path: 'login',                        component: LoginComponent,                                          data: { titulo: 'Login' }        },
            { path: 'grilla-solicitudes',           component: GrillaSolicitudesComponent,  canActivate: [AuthGuard],   data: { titulo: 'Grilla de solicitudes' }},
            { path: 'solicitud/:id',                component: SolicitudComponent,   canActivate: [AuthGuard],          data: { titulo: 'Datos de la solicitud' }}
        ]
    }
];


export const PAGES_ADMIN_ROUTES = RouterModule.forChild( pagesRoutes );