import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private _auth: AuthService, 
    private router: Router
  ) { }

  canActivate(): boolean {
    if(!this._auth.isLogued()) {
      alert("No se encuentra logueado");
      this.router.navigate(['admin/login']);
      return false;
    }
    return true;
  }
}
