import { DataService } from 'src/app/services/data.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InscripcionGuardService implements CanActivate {

  constructor(
    private _data: DataService, 
    private router: Router
  ) { }

  canActivate(): boolean {
    if(!this._data.habilitarInscripcion) {
      alert("La inscripción está cerrada");
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
