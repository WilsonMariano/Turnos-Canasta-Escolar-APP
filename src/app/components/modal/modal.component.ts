import { Component, Input, OnChanges } from '@angular/core';
import { StateService } from '../../services/state.service';
import { Router } from '@angular/router';

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
    private _router: Router
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
    
  }

}
