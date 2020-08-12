import { Component, Input, OnChanges } from '@angular/core';
import { StateService } from '../../services/state.service';
import { Router } from '@angular/router';
import { FxGlobalsService } from 'src/app/services/fx-globals.service';
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
    private _fx: FxGlobalsService
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
    console.log(this._state.consultarState());
    $("#modal").modal('hide');
    this._fx.alert("Solicitud enviada", "La solicitud se efectuó correctamente, deberas esperar a que la misma sea validada. Consultá el estado de tu trámite en la página principal, opción 'Consultar solicitud'.", "success");
    setTimeout(() => {
      this.navigateTo('home');
    }, 3000);
  }

}
