import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenericService } from 'src/app/services/http/generic.service';
import { FamiliaresService } from 'src/app/services/http/familiares.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit, OnDestroy {

  public titular = null;
  public familiares = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _httpGeneric: GenericService,
    private _httpFamiliares: FamiliaresService) { }

  ngOnInit() {
    this._activatedRoute.params
    .subscribe(
      data => {
        if(data.id) {
          this.traerTitular(data.id);
          this.traerFamiliares(data.id);
        }
      }
    );
  }

  ngOnDestroy() {
    this.titular = null;
    this.familiares = [];
  }

  private traerTitular(id: number) {
    this._httpGeneric.getOne('Titulares', id)
      .subscribe(
        data => {this.titular = data; console.log(data)}
      )
  }

  private traerFamiliares(idTitular: number) {
    this._httpFamiliares.getAll(idTitular)
      .subscribe(
        data => {this.familiares = data; console.log(data)}
      )
  }

}
