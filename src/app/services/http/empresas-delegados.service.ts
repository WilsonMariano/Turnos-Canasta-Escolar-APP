import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresasDelegadosService {

  constructor(private _http: HttpClient) { }

  public getOne(cuit: number): Observable<any> {

    let params = new HttpParams()
      .set('cuit', cuit.toString());

    return this._http.get(`${environment.apiUrl}/concepto-gasto/one`, 
      { params }
    );
  }
}
