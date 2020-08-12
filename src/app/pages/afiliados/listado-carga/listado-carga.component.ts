import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { StateService } from '../../../services/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-carga',
  templateUrl: './listado-carga.component.html',
  styleUrls: ['./listado-carga.component.css']
})
export class ListadoCargaComponent implements OnInit {

  public titular = null;
  public familiares = [];

  public faEdit = faPencilAlt;
  public faTrash = faTrashAlt;

  constructor(
    private _router: Router,
    private _state: StateService
   ) { }

  ngOnInit() {
    this.titular = this._state.consultarTitular();
    this.familiares = this._state.consultarFamiliares();
  }

  public navigateTo(url: string) {
    this._router.navigate([url]);
  }

  public borrarFamiliar(familiar) {
    this._state.borrarFamiliar(familiar);
  }

  public editarFamiliar(familiar) {
    localStorage.setItem('familiarEditar', JSON.stringify(familiar));
    this.navigateTo('afiliados/registro-familiar');
  }
  

}
