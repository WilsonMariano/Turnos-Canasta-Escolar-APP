import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FamiliaresService {

  constructor(private _http: HttpClient) { }

  public getAll(idTitular: number): Observable<any> {

    let params = new HttpParams()
      .set('idTitular', idTitular.toString());

    return this._http.get(`${environment.apiUrl}/familiares/all`, 
      { params }
    );
  }
}