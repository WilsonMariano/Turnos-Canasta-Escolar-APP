import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { AuthModule } from '../services/auth/auth.module';
import { PAGES_AFILI_ROUTES } from './afiliados/pages-afiliados.routes';
import { PAGES_ADMIN_ROUTES } from './admin/pages-admin.routes';

import { HomeComponent } from './home/home.component';
import { PagesAfiliadosComponent } from './afiliados/pages-afiliados.component';
import { RegistroAfiliadoComponent } from './afiliados/registro-afiliado/registro-afiliado.component';
import { RegistroFamiliarComponent } from './afiliados/registro-familiar/registro-familiar.component';
import { ListadoCargaComponent } from './afiliados/listado-carga/listado-carga.component';
import { ElegirPuntoEntregaComponent } from './afiliados/elegir-punto-entrega/elegir-punto-entrega.component';
import { ConsultarTramiteComponent } from './afiliados/consultar-tramite/consultar-tramite.component';
import { PagesAdminComponent } from './admin/pages-admin.component';
import { LoginComponent } from './admin/login/login.component';
import { GrillaSolicitudesComponent } from './admin/grilla-solicitudes/grilla-solicitudes.component';
import { SolicitudComponent } from './admin/solicitud/solicitud.component';
import { ExportarListadosComponent } from './admin/exportar-listados/exportar-listados.component';



@NgModule({
  declarations: [
    HomeComponent,
    PagesAfiliadosComponent,
    RegistroAfiliadoComponent,
    RegistroFamiliarComponent,
    ListadoCargaComponent,
    ElegirPuntoEntregaComponent,
    ConsultarTramiteComponent,
    PagesAdminComponent,
    LoginComponent,
    GrillaSolicitudesComponent,
    SolicitudComponent,
    ExportarListadosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PAGES_AFILI_ROUTES,
    PAGES_ADMIN_ROUTES,
    FontAwesomeModule,
    SharedModule,
    ComponentsModule,
    AuthModule
  ],
  exports: [
    PagesAfiliadosComponent
  ]
})
export class PagesModule { }
