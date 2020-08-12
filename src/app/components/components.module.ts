import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { StateService } from '../services/state.service';

import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [
    JumbotronComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ], 
  exports: [
    JumbotronComponent,
    ModalComponent
  ],
  providers: [
    StateService 
  ]
})
export class ComponentsModule { }
