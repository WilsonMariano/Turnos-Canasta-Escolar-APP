import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenericService } from 'src/app/services/http/generic.service';
import { FamiliaresService } from 'src/app/services/http/familiares.service';
import { first } from 'rxjs/operators';
import { FxGlobalsService } from 'src/app/services/fx-globals.service';
import { AuthService } from 'src/app/services/auth/auth.service';
declare var $;

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit, OnDestroy {

  public titular = null;
  public familiares = [];
  public solicitud = null;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _httpGeneric: GenericService,
    private _httpFamiliares: FamiliaresService,
    private _fx: FxGlobalsService,
    private _auth: AuthService) { }

  ngOnInit() {
    this.traerDatos();
  }

  ngOnDestroy() {
    this.titular = null;
    this.familiares = [];
  }

  private async traerDatos() {
    const data = await this._activatedRoute.params.pipe(first()).toPromise();

    this.traerTitular(data.idTitular);
    this.traerFamiliares(data.idTitular)
    this.traerSolicitud(data.idSolicitud);
  }

  private traerTitular(id: number) {
    this._httpGeneric.getOne('Titulares', id)
      .subscribe(
        data => this.titular = data
      );
  }

  private traerFamiliares(idTitular: number) {
    this._httpFamiliares.getAll(idTitular)
      .subscribe(
        data => this.familiares = data
      );
  }

  private traerSolicitud(idSolicitud: number) {
    this._httpGeneric.getOne('vwSolicitudes', idSolicitud)
      .subscribe(
        data => this.solicitud = data
      );
  }

  public abrirModalSolicitud = () => $("#modalSolicitud").modal({backdrop: 'static', keyboard: false});

  public editSuccess(result) {
    if(result) {
      $("#modalSolicitud").modal("hide");
      this._fx.showToast('Solicitud editada correctamente!', 'success');
      this.traerDatos();
    } 
  }
}
