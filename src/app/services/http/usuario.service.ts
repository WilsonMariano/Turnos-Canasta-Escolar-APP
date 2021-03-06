import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FxGlobalsService } from '../fx-globals.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private _http: HttpClient,
    private _fx: FxGlobalsService) { }

  public login(email: string, password: string): Observable<any> {
    this._fx.showSpinner();

    return this._http.post(`${environment.apiUrl}/usuarios/login`, 
      { 
        email,
        password
      }
    ).pipe(finalize(() => this._fx.hideSpinner(500)));
  }
}