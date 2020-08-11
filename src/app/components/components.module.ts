import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { JumbotronComponent } from './jumbotron/jumbotron.component';



@NgModule({
  declarations: [
    JumbotronComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ], 
  exports: [
    JumbotronComponent
  ]
})
export class ComponentsModule { }
