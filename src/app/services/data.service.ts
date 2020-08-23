import { Injectable } from '@angular/core';
import { GenericService } from './http/generic.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public nivelesEducacion = [];
  public puntosEntrega = [];
  public estadosSolicitud = [];

  constructor(private _httpGeneric: GenericService) {
    this.traerNivelesEducacion();
    this.traerPuntosEntrega();
    this.traerEstadosSolicitud();
  }

    private traerPuntosEntrega() {
      this._httpGeneric.getAll('LugaresEntrega')
        .subscribe(
          data => this.puntosEntrega = this.lnglatTransform(data),
          err => console.error(err)
        );
    }

    private traerNivelesEducacion() {
      this._httpGeneric.getWithPaged('Diccionario', 100, 0, [
        {
          col: 'clave', 
          txt: 'NIVEL_EDUCACION'
        }])
        .subscribe(
          data => this.nivelesEducacion = data.data,
          err => console.error(err)
        );
    }

    private traerEstadosSolicitud() {
      this._httpGeneric.getWithPaged('Diccionario', 100, 0, [
        {
          col: 'clave', 
          txt: 'ESTADO_SOLICITUD'
        }])
        .subscribe(
          data => this.estadosSolicitud = data.data,
          err => console.error(err)
        );
    }

    private lnglatTransform(arr) {

      arr.map(punto => {
        let x = (<string>punto['lnglat']).split(',');
        let y = [];
        y[0] = Number.parseFloat(x[0].trim());
        y[1] = Number.parseFloat(x[1].trim());
        
        punto.lnglat = y;
      });
      return arr;
    }

    public obtenerNivelEducacion(clave) {
      return this.nivelesEducacion.find(element => element.clave == clave);
    }
}
