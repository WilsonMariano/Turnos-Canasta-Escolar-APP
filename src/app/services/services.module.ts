import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresasDelegadosService } from './http/empresas-delegados.service';
import { GenericService } from './http/generic.service';
import { DataService } from './data.service';
import { FxGlobalsService } from './fx-globals.service';
import { StateService } from './state.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    EmpresasDelegadosService,
    GenericService,
    DataService,
    FxGlobalsService,
    StateService
  ]
})
export class ServicesModule { }
