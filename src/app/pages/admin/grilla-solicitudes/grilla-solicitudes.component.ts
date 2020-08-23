import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { FxGlobalsService } from 'src/app/services/fx-globals.service';
declare var $;

@Component({
  selector: 'app-grilla-solicitudes',
  templateUrl: './grilla-solicitudes.component.html',
  styleUrls: ['./grilla-solicitudes.component.css']
})
export class GrillaSolicitudesComponent implements OnInit {

  public reloadGrid = new Subject<boolean>();


  public objSolicitud = null;

  public arrAttr = [
    { 'attr': 'id', 'type': 'Number' },
    { 'attr': 'fechaAlta', 'type': 'Date' },
    { 'attr': 'numAfiliado', 'type': 'Number' },
    { 'attr': 'cuil', 'type': 'Number' },
    { 'attr': 'apellido', 'type': 'String' },
    { 'attr': 'nombre', 'type': 'String' },
    { 'attr': 'puntoEntrega', 'type': 'String' },
    { 'attr': 'nombreEstado', 'type': 'String' }
  ];


  public arrControls = ['id', 'Fecha alta', 'Afiliado', 'CUIL', 'Apellido', 'Nombre', 'Lugar entrega', 'Estado'];


  public options = {
    'entity': 'vwSolicitudes',
    'arrAttr': this.arrAttr,
    'arrControls': this.arrControls,
    'buttons': [
      { 'url': 'admin/cambiar-estado', 'title': 'Cambiar estado' },
      { 'url': 'admin/grilla-familiares', 'title': 'Ver solicitud' }
    ],
    'reload': null
  }

  constructor(
    private _router: Router,
    private _fx: FxGlobalsService) { }

  ngOnInit() {
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
    }
  }

  public editSuccess(result) {
    if (result) {
      $("#modalSolicitud").modal("hide");
      this._fx.showToast('Solicitud editada correctamente!', 'success');
      this.reloadGrid.next();
    }
  }

}
