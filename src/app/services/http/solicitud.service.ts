import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(private _http: HttpClient) { }

  public insert(solicitud: []): Observable<any> {

    return this._http.post(
      `${environment.apiUrl}/solicitudes/insert`,
      solicitud
    );
  }
}
