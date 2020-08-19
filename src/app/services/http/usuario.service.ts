import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private _http: HttpClient) { }

  public login(email: string, password: string): Observable<any> {

    return this._http.post(`${environment.apiUrl}/usuarios/login`, 
      { 
        email,
        password
      }
    );
  }
}