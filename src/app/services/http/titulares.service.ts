import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TitularesService {

  constructor(private _http: HttpClient) { }

  public getOne(cuil: number): Observable<any> {

    let params = new HttpParams()
      .set('cuil', cuil.toString());

    return this._http.get(`${environment.apiUrl}/titulares/one`, 
      { params }
    );
  }
}