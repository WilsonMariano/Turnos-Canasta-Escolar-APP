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

    let params = new HttpParams()
      .set('cuil', cuil.toString());

    return this._http.get(`${environment.apiUrl}/cronograma/one`, 
      { params }
    ).pipe(
      finalize(() => this._fx.hideSpinner(500))
    );
  }
}
