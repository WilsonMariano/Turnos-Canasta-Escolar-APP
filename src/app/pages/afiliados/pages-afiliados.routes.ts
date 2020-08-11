import { RouterModule, Routes } from '@angular/router';

import { PagesAfiliadosComponent } from './pages-afiliados.component';
import { RegistroAfiliadoComponent } from './registro-afiliado/registro-afiliado.component'
import { RegistroFamiliarComponent } from './registro-familiar/registro-familiar.component'
import { ListadoCargaComponent } from './listado-carga/listado-carga.component'


const pagesRoutes: Routes = [
    {
        path: 'afiliados',
        component: PagesAfiliadosComponent,
        children: [
            { path: '',                             redirectTo: '/registro-afiliado'            ,   pathMatch: 'full' },
            { path: 'registro-afiliado',            component: RegistroAfiliadoComponent,   data: { titulo: 'Registro afiliado' }        },
            { path: 'registro-familiar',            component: RegistroFamiliarComponent,   data: { titulo: 'Registro familiar' }        },
            { path: 'listado-carga',                component: ListadoCargaComponent,       data: { titulo: 'Registro familiar' }        }
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );