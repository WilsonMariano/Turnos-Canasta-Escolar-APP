import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";

import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { ModalComponent } from './modal/modal.component';
import { AlertComponent } from './alert/alert.component';
import { GrillaComponent } from './grilla/grilla.component';
import { ModalSolicitudComponent } from './modal-solicitud/modal-solicitud.component';
import { LoadingComponent } from './loading/loading.component';
import { NavAdminComponent } from './nav-admin/nav-admin.component';




@NgModule({
  declarations: [
    JumbotronComponent,
    ModalComponent,
    AlertComponent,
    GrillaComponent,
    ModalSolicitudComponent,
    LoadingComponent,
    NavAdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxSpinnerModule
  ], 
  exports: [
    JumbotronComponent,
    ModalComponent,
    AlertComponent,
    GrillaComponent,
    ModalSolicitudComponent,
    LoadingComponent,
    NavAdminComponent
  ],
  providers: [
    NgxSpinnerService
  ]
})
export class ComponentsModule { }
