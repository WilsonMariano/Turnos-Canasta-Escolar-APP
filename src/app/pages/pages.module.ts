import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { PAGES_ROUTES } from './afiliados/pages-afiliados.routes';

import { HomeComponent } from './home/home.component';
import { PagesAfiliadosComponent } from './afiliados/pages-afiliados.component';
import { RegistroAfiliadoComponent } from './afiliados/registro-afiliado/registro-afiliado.component';
import { RegistroFamiliarComponent } from './afiliados/registro-familiar/registro-familiar.component';
import { ListadoCargaComponent } from './afiliados/listado-carga/listado-carga.component';
import { ElegirPuntoEntregaComponent } from './afiliados/elegir-punto-entrega/elegir-punto-entrega.component';
import { ConsultarTramiteComponent } from './afiliados/consultar-tramite/consultar-tramite.component';



@NgModule({
  declarations: [
    HomeComponent,
    PagesAfiliadosComponent,
    RegistroAfiliadoComponent,
    RegistroFamiliarComponent,
    ListadoCargaComponent,
    ElegirPuntoEntregaComponent,
    ConsultarTramiteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PAGES_ROUTES,
    FontAwesomeModule,
    SharedModule,
    ComponentsModule
  ],
  exports: [
    PagesAfiliadosComponent
  ]
})
export class PagesModule { }
