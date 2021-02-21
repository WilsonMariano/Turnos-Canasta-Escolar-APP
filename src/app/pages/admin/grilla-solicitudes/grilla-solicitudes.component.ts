import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { FxGlobalsService } from 'src/app/services/fx-globals.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GenericService } from 'src/app/services/http/generic.service';
declare var $;

@Component({
  selector: 'app-grilla-solicitudes',
  templateUrl: './grilla-solicitudes.component.html',
  styleUrls: ['./grilla-solicitudes.component.css']
})
export class GrillaSolicitudesComponent implements OnInit {

  constructor(
    private _router: Router,
    private _fx: FxGlobalsService,
    private _auth: AuthService,
    private _http: GenericService) { }


  public reloadGrid = new Subject<boolean>();
  public objSolicitud = null;

  public arrAttr = [
    { 'attr': 'id', 'type': 'Number' },
    { 'attr': 'fechaAlta', 'type': 'Date' },
    { 'attr': 'numAfiliado', 'type': 'Number' },
    { 'attr': 'cuil', 'type': 'Number' },
    { 'attr': 'apellido', 'type': 'String' },
    { 'attr': 'nombre', 'type': 'String' },
    { 'attr': 'cuitEmpresa', 'type': 'Number' },
    { 'attr': 'puntoEntrega', 'type': 'String' },
    { 'attr': 'nombreEstado', 'type': 'String' }
  ];

  public arrControls = ['id', 'Fecha alta', 'Afiliado', 'CUIL', 'Apellido', 'Nombre', 'CUIT', 'Lugar entrega', 'Estado'];

  private filterParams = {
    'col': 'idPuntoEntrega',
    'txt': this._auth.getData().idPuntoEntrega
  }

  public options = {
    'entity': 'vwSolicitudes',
    'arrAttr': this.arrAttr,
    'arrControls': this.arrControls,
    'buttons': [
      { 'title': 'Ver solicitud' }
    ],
    'filterParams':  this.filterParams,
    'reload': null
  }


  ngOnInit() {
    this._auth.getData().role == 'admin' && this.options.buttons.push({ 'title': 'Cambiar estado' });
    this._auth.getData().role == 'usuario' && this.options.buttons.push({ 'title': 'Entregado' });
  }

  public handleEvents(event) {

    switch (event.control) {
      case 'Cambiar estado':
        this.objSolicitud = event.obj;
        $("#modalSolicitud").modal({backdrop: 'static', keyboard: false});
      break;
      case 'Ver solicitud':
        this._router.navigate(['admin/solicitud', event.obj.idTitular, event.obj.id]);
      break;
      case 'Entregado': 
        this.cambiarEstadoEntregado(event.obj);
      break;
    }
  }

  private cambiarEstadoEntregado(obj) {
    
    this._fx.alertConfirm("Confirmación", "¿Desea marcar la solicitud como entregada?", "warning")
      .then(() => {
        let solicitud = {
          id:  obj.id,
          idTitular: obj.idTitular,
          idPuntoEntrega: obj.idPuntoEntrega,
          fechaEntrega: obj.fechaEntrega,
          horaEntrega: obj.horaEntrega,
          observaciones: obj.observaciones,
          estado: 'ESTADO_SOLICITUD_4'
        }
    
        this._http.putOne('Cronograma', solicitud)
          .subscribe(
            data => this.reloadGrid.next()
          );
      })
      .catch(() => {});
  }



  public editSuccess(result) {
    if (result) {
      $("#modalSolicitud").modal("hide");
      this._fx.showToast('Solicitud editada correctamente!', 'success');
      this.reloadGrid.next();
    }
  }

}
