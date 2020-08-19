import { RouterModule, Routes } from '@angular/router';

import { PagesAfiliadosComponent } from './pages-afiliados.component';
import { RegistroAfiliadoComponent } from './registro-afiliado/registro-afiliado.component';
import { RegistroFamiliarComponent } from './registro-familiar/registro-familiar.component';
import { ListadoCargaComponent } from './listado-carga/listado-carga.component';
import { ElegirPuntoEntregaComponent } from './elegir-punto-entrega/elegir-punto-entrega.component';
import { ConsultarTramiteComponent } from './consultar-tramite/consultar-tramite.component';


const pagesRoutes: Routes = [
    {
        path: 'afiliados',
        component: PagesAfiliadosComponent,
        children: [
            { path: '',                             redirectTo: '/registro-afiliado',       pathMatch: 'full'                            },
            { path: 'registro-afiliado',            component: RegistroAfiliadoComponent,   data: { titulo: 'Registro afiliado' }        },
            { path: 'registro-familiar',            component: RegistroFamiliarComponent,   data: { titulo: 'Registro familiar' }        },
            { path: 'listado-carga',                component: ListadoCargaComponent,       data: { titulo: 'Datos cargados'    }        },
            { path: 'elegir-punto-entrega',         component: ElegirPuntoEntregaComponent, data: { titulo: 'Elegir punto de entrega' }  },
            { path: 'consultar-tramite',            component: ConsultarTramiteComponent,   data: { titulo: 'Consultar tramite' }        }
        ]
    }
];


export const PAGES_AFILI_ROUTES = RouterModule.forChild( pagesRoutes );