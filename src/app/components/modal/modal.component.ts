import { Component, Input, OnChanges } from '@angular/core';
import { StateService } from '../../services/state.service';
import { Router } from '@angular/router';
import { FxGlobalsService } from 'src/app/services/fx-globals.service';
import { SolicitudService } from 'src/app/services/http/solicitud.service';
import { DataService } from 'src/app/services/data.service';
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
    private _http: SolicitudService,
    public _data: DataService
  ) { }

  ngOnChanges() {
    this.titular = this._state.consultarTitular();
    this.familiares = this._state.consultarFamiliares();
  }

  public navigateTo(url: string) {
    this._router.navigate([url]);
  }

  public confirmarSolicitud() {

    const solicitud = this._state.consultarState();
    const tipoOperacion = this._state.consultarOperationType();

    if(this.validarSolicitud(solicitud)) {
      const methodHttp = (tipoOperacion === 'alta' 
        ? this._http.insert.bind(this._http)
        : this._http.edit.bind(this._http));

      methodHttp(solicitud).subscribe(
        data => {
          if(data) {
            $("#modal").modal('hide');
            tipoOperacion === 'alta'
              ? this._fx.showAlert("Solicitud enviada", "La solicitud se efectuó correctamente, en un lapso de 48 hs. la misma será validada. Consultá el estado de tu trámite en la página principal, opción 'Consultar solicitud'.", "success", 500)
              : this._fx.showAlert("Solicitud editada", "La solicitud se editó correctamente, en un lapso de 48 hs. la misma será validada. Consultá el estado de tu trámite en la página principal, opción 'Consultar solicitud'.", "success", 500);
            setTimeout(() => this.navigateTo('home'), 2000);
            this._state.clearStorage();
          }
        },
        err => {
          $("#modal").modal('hide');
          this._fx.showAlert("Error", `Se produjo un error al procesar la solicitud. Motivo: ${err.error}`, "error", 500);
        }
      )
    }
  }

  private validarSolicitud(solicitud) {
    let valid = (solicitud.titular && solicitud.familiares.length != 0 && solicitud.puntoEntrega ? true : false); 

    if(!valid) {
      $("#modal").modal('hide');
          this._fx.showAlert("Error", "La solicitud no está completa.", "error");
    }

    return valid;
  }
}
