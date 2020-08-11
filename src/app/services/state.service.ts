import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private state;

  constructor() {
    this.loadStorage();
   }

  public guardarTitular(titular) {
    this.state.titular = titular;
    this.saveStorage();
  }

  public consultarTitular() {
    return this.state.titular;
  }

  public consultarFamiliares() {
    return this.state.familiares;
  }

  public guardarFamiliar(familiar) {
    this.state.familiares.push(familiar);
    this.saveStorage();
  }

  public borrarFamiliar(familiar) {
    let i = this.state.familiares.indexOf(familiar);

    if(i >= 0) {
      this.state.familiares.splice(i, 1);
      this.saveStorage();
    }
  }

  private loadStorage() {
    this.state = JSON.parse(localStorage.getItem('state')) || this.stateInit();
  }

  private saveStorage() {
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  private stateInit() {
    return {
      titular: null,
      familiares: []
    }
  }
}
