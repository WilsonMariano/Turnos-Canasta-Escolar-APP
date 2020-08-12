import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-elegir-punto-entrega',
  templateUrl: './elegir-punto-entrega.component.html',
  styleUrls: ['./elegir-punto-entrega.component.css']
})
export class ElegirPuntoEntregaComponent implements OnInit {

  public puntoEntrega = null;
  public abrirModal = false;
  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;

  constructor(private _state: StateService) { }


  ngOnInit() {
    this.puntoEntrega = this._state.consultarPuntoEntrega() || null;
  }

  public guardarPuntoEntrega(puntoEntrega: string) {
    this.puntoEntrega = puntoEntrega;
    this._state.guardarPuntoEntrega(puntoEntrega);
  }

  public finalizarTramite() {
    this.abrirModal = true;
  }

}
