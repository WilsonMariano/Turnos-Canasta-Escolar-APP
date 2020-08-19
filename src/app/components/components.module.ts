import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { ModalComponent } from './modal/modal.component';
import { AlertComponent } from './alert/alert.component';
import { GrillaComponent } from './grilla/grilla.component';
import { ModalSolicitudComponent } from './modal-solicitud/modal-solicitud.component';



@NgModule({
  declarations: [
    JumbotronComponent,
    ModalComponent,
    AlertComponent,
    GrillaComponent,
    ModalSolicitudComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ], 
  exports: [
    JumbotronComponent,
    ModalComponent,
    AlertComponent,
    GrillaComponent,
    ModalSolicitudComponent
  ]
})
export class ComponentsModule { }
