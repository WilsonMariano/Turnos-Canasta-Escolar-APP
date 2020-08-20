import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { finalize } from 'rxjs/operators';
import { FxGlobalsService } from '../fx-globals.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(
    private _http: HttpClient,
    private _fx: FxGlobalsService) { }

  public insert(solicitud: []): Observable<any> {
    this._fx.showSpinner();

    return this._http.post(
      `${environment.apiUrl}/solicitudes/insert`,
      solicitud
    ).pipe(
      finalize(() => this._fx.hideSpinner(500))
    );
  }
}
