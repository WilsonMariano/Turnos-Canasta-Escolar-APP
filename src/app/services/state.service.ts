import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private state;

  constructor() {
    this.loadStorage();
   }

  public consultarState() {
    return this.state;
  }

  public guardarTitular(titular) {
    this.state.titular = this.objToUpperCase(titular);
    this.saveStorage();
  }

  public consultarTitular() {
    return this.state.titular;
  }

  public consultarFamiliares() {
    return this.state.familiares;
  }

  public guardarFamiliar(familiar) {
    this.state.familiares.push(this.objToUpperCase(familiar));
    this.saveStorage();
  }

  public buscarFamiliar(familiar) {
    let encontrado = this.state.familiares.find(f => f.dni == familiar.dni);
    return encontrado ? true : false;
  }

  public borrarFamiliar(familiar) {
    let i = this.state.familiares.indexOf(familiar);

    if(i >= 0) {
      this.state.familiares.splice(i, 1);
      this.saveStorage();
    }
  }

  public editarFamiliar(famAnterior, famNuevo) {
    this.state.familiares.map((familiar, i) => {
      if(familiar.dni == famAnterior.dni) {
        this.state.familiares[i] = famNuevo;
      } 
    });
    this.saveStorage();
  }

  public guardarPuntoEntrega(puntoEntrega: string) {
    this.state.puntoEntrega = puntoEntrega;
    this.saveStorage();
  }

  public consultarPuntoEntrega() {
    return this.state.puntoEntrega;
  }

  private loadStorage() {
    this.state = JSON.parse(localStorage.getItem('state')) || this.stateInit();
  }

  private saveStorage() {
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  public clearStorage() {
    localStorage.clear();
  }

  private stateInit() {
    return {
      titular: null,
      familiares: [],
      puntoEntrega: null
    }
  }

  private objToUpperCase(obj) {
    for(let key in obj){
      if(typeof obj[key] == 'string'){
        obj[key] = obj[key].toUpperCase();
      }
    }
    return obj;
  }
}
