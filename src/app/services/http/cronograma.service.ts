import { IsolicitudListado } from './../../pages/admin/exportar-listados/model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { finalize } from 'rxjs/operators';
import { FxGlobalsService } from '../fx-globals.service';

@Injectable({
  providedIn: 'root'
})
export class CronogramaService {

  constructor(
    private _http: HttpClient,
    private _fx: FxGlobalsService) { }

  public getOne(cuil: number): Observable<any> {
    this._fx.showSpinner();

    const params = new HttpParams()
      .set('cuil', cuil.toString());

    return this._http.get(`${environment.apiUrl}/cronograma/one`, 
      { params }
    ).pipe(
      finalize(() => this._fx.hideSpinner(500))
    );
  }

  public getAllByFecha(solicitud: IsolicitudListado): Observable<any> {
    this._fx.showSpinner();

    let params = new HttpParams()
    .set('fechaDesde', solicitud.fechaDesde)
    .set('fechaHasta', solicitud.fechaHasta);

      solicitud.puntoEntrega !== ''
      ? params = params.append('idPuntoEntrega', solicitud.puntoEntrega.toString())
      : params = params;

    return this._http.get(`${environment.apiUrl}/cronograma/all-by-fecha`, 
      { params }
    ).pipe(
      finalize(() => this._fx.hideSpinner(500))
    );
  }
}
