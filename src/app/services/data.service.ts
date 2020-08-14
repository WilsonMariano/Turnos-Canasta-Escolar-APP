import { Injectable } from '@angular/core';
import { GenericService } from './http/generic.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public nivelesEducacion = [];
  public puntosEntrega = [];

  constructor(private _httpGeneric: GenericService) {
    this.traerNivelesEducacion();
    this.traerPuntosEntrega();
  }

    private traerPuntosEntrega() {
      this._httpGeneric.getAll('lugaresentrega')
        .subscribe(
          data => this.puntosEntrega = data,
          // data => console.log(data),
          err => console.error(err)
        );
    }

    private traerNivelesEducacion() {
      this._httpGeneric.getWithPaged('diccionario', 100, 0, [
        {
          col: 'clave', 
          txt: 'NIVEL_EDUCACION'
        }])
        .subscribe(
          data => this.nivelesEducacion = data,
          // data => console.log(data),
          err => console.error(err)
        );
    }
}
