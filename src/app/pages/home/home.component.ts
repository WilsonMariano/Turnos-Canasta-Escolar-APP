import { DataService } from 'src/app/services/data.service';
import { StateService } from './../../services/state.service';
import { SolicitudService } from 'src/app/services/http/solicitud.service';
import { FxGlobalsService } from './../../services/fx-globals.service';
import { Component, OnInit } from '@angular/core';
import { faEdit, faCarSide, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';
declare const $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public faEdit =  faEdit;
  public faAddressCard = faAddressCard;
  public faCar = faCarSide;
  public faUserPlus = faUserPlus;

  constructor(
    public _router: Router,
    private _fx: FxGlobalsService,
    private _http: SolicitudService,
    private _state: StateService,
    public _data: DataService
    ) { }

  ngOnInit() {
  }

  public handleOperation(tipo: string) {
    switch(tipo) {
      case 'alta':
        this._state.setOperationType(tipo);
        this.navigateTo('afiliados/registro-afiliado');
        break;
      case 'editar':
        this._state.setOperationType(tipo);
        this.openModalAfiliado();
        break;
      case 'consultar':
        this.navigateTo('afiliados/consultar-tramite')
        break;
    }
  }

  public navigateTo(path): void {
    this._router.navigate([path]);
  }

  public openModalAfiliado(): void {
    $('#modalBuscarSolicitud').modal('show')
  }

  public buscarSolicitud(cuil): void {
    this._http.getOneByCuil(cuil).subscribe(
      data => {
        this._state.guardarSolicitud(data);
        $('#modalBuscarSolicitud').modal('hide');
        this.navigateTo('afiliados/listado-carga');
      },
      err => {console.log(err);this._fx.showAlert("Importante", `${err.error}`, "info", 500)}
    );
  }

}
