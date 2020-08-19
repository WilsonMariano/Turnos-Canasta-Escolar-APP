import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from 'src/app/services/auth/auth-guard.service';


import { PagesAdminComponent } from './pages-admin.component';
import { LoginComponent } from './login/login.component';
import { GrillaSolicitudesComponent } from './grilla-solicitudes/grilla-solicitudes.component';


const pagesRoutes: Routes = [
    {
        path: 'admin',
        component: PagesAdminComponent,
        children: [
            { path: '',                             redirectTo: '/login',                   pathMatch: 'full'                            },
            { path: 'login',                        component: LoginComponent,                                          data: { titulo: 'Login' }        },
            { path: 'grilla-solicitudes',           component: GrillaSolicitudesComponent,  canActivate: [AuthGuard],   data: { titulo: 'Grilla de solicitudes' }        }
        ]
    }
];


export const PAGES_ADMIN_ROUTES = RouterModule.forChild( pagesRoutes );