import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { finalize } from 'rxjs/operators';
import { FxGlobalsService } from '../fx-globals.service';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor(
    private _http: HttpClient,
    private _fx: FxGlobalsService) { }

  public getAll(entity: String): Observable<any> {
    this._fx.showSpinner();

    let params = new HttpParams()
      .set('t', entity.toString());

    return this._http.get(`${environment.apiUrl}/generic/all`, 
      { params }
    ).pipe(finalize(() => this._fx.hideSpinner(500)));
  }

  public getOne(entity: String, id: number): Observable<any> {
    this._fx.showSpinner();

    let params = new HttpParams()
      .set('t', entity.toString());

    return this._http.get(`${environment.apiUrl}/generic/one/${id}`, 
      { params }
    ).pipe(finalize(() => this._fx.hideSpinner(500)));
  }

  public getWithPaged(entity: String, rows: Number, page: Number, arrFilterParams?: any, showSpinner = true): Observable<any> {

    showSpinner && this._fx.showSpinner();
    
    let params = new HttpParams()
      .set( 'rows', rows.toString() )
      .set( 'page', page.toString() )
      .set( 'entity', entity.toString() )


    // Se inicia la generación de parámetros de filtrado
    if( arrFilterParams ) {

      let i = 1;
  
      for(let key in arrFilterParams) {

        if( arrFilterParams[key] ) {
  
          params = params
                .append( `col${ i }`, arrFilterParams[key]['col'] )
                .append( `txt${ i }`, arrFilterParams[key]['txt'] );
    
          i++;
        }
      }
    }
    // Fin de generación de parámetros
    

    return this._http.get( `${environment.apiUrl}/generic/paged`, 
      { params }
    ).pipe(finalize(() => this._fx.hideSpinner(500)));
  }  

  public putOne(entity: String, obj): Observable<any> {

    this._fx.showSpinner();

    let params = new HttpParams()
      .set('t', entity.toString());

    return this._http.put(`${environment.apiUrl}/generic/put`, 
      obj,
      { params }
    ).pipe(finalize(() => this._fx.hideSpinner(500)));
  }
}
