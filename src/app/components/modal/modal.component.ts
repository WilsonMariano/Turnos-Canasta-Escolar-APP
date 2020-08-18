import { Component, Input, OnChanges } from '@angular/core';
import { StateService } from '../../services/state.service';
import { Router } from '@angular/router';
import { FxGlobalsService } from 'src/app/services/fx-globals.service';
import { SolicitudService } from 'src/app/services/http/solicitud.service';
declare var $;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnChanges {
  @Input() open = false;

  public titular = null;
  public familiares = [];

  constructor(
    private _state: StateService,
    private _router: Router,
    private _fx: FxGlobalsService,
    private _http: SolicitudService
  ) { }

  ngOnChanges() {
    this.titular = this._state.consultarTitular();
    this.familiares = this._state.consultarFamiliares();
  }

  public calcularCantUtiles() {
    let sum = 0;
    this.familiares.map(fam => {
      if(fam.edad >= 4 && fam.edad <= 18) {
        sum++;
      }
    });
    return sum;
  }

  public calcularCantJuguetes() {
    let sum = 0;
    this.familiares.map(fam => {
      if(fam.edad >= 0 && fam.edad <= 12) {
        sum++;
      }
    });
    return sum;
  }

  public navigateTo(url: string) {
    this._router.navigate([url]);
  }

  public confirmarSolicitud() {

    let solicitud = this._state.consultarState();

    if(this.validarSolicitud(solicitud)) {
      this._http.insert(solicitud)
      .subscribe(
        data => {
          if(data) {
            $("#modal").modal('hide');
            this._fx.alert("Solicitud enviada", "La solicitud se efectuó correctamente, deberas esperar a que la misma sea validada. Consultá el estado de tu trámite en la página principal, opción 'Consultar solicitud'.", "success");
            setTimeout(() => this.navigateTo('home'), 2000);
            this._state.clearStorage();
          }
        },
        err => {
          $("#modal").modal('hide');
          this._fx.alert("Error", "Se produjo un error al procesar la solicitud, por favor intente más tarde.", "error");
        }
      )
    }
  }

  private validarSolicitud(solicitud) {
    let valid = (solicitud.titular && solicitud.familiares.length != 0 && solicitud.puntoEntrega ? true : false); 

    if(!valid) {
      $("#modal").modal('hide');
          this._fx.alert("Error", "La solicitud no está completa.", "error");
    }

    return valid;
  }
}
