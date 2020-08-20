import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FxGlobalsService } from '../fx-globals.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FamiliaresService {

  constructor(
    private _http: HttpClient,
    private _fx: FxGlobalsService) { }

  public getAll(idTitular: number): Observable<any> {
    this._fx.showSpinner();

    let params = new HttpParams()
      .set('idTitular', idTitular.toString());

    return this._http.get(`${environment.apiUrl}/familiares/all`, 
      { params }
    ).pipe(finalize(() => this._fx.hideSpinner(500)));
  }
}