import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

import { RoutesService } from '../services/shared/routes.service';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    BreadcrumbComponent
  ],
  providers: [
    RoutesService
  ]
})
export class SharedModule { }
