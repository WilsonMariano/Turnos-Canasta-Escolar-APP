import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { ModalComponent } from './modal/modal.component';
import { AlertComponent } from './alert/alert.component';



@NgModule({
  declarations: [
    JumbotronComponent,
    ModalComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ], 
  exports: [
    JumbotronComponent,
    ModalComponent,
    AlertComponent
  ]
})
export class ComponentsModule { }
