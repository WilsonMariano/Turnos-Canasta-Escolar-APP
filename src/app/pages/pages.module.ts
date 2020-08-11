import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from '../shared/shared.module';
import { APP_ROUTES } from './pages.routes';

import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { RegistroComponent } from './registro/registro.component';



@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    APP_ROUTES,
    FontAwesomeModule,
    SharedModule
  ],
  exports: [
    PagesComponent
  ]
})
export class PagesModule { }
