import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
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
    { 'attr': 'id',           'type': 'Number' }, 
    { 'attr': 'fechaAlta',    'type': 'Date'   }, 
    { 'attr': 'numAfiliado',  'type': 'Number' },
    { 'attr': 'cuil',         'type': 'Number' },
    { 'attr': 'apellido',     'type': 'String' },
    { 'attr': 'nombre',       'type': 'String' }, 
    { 'attr': 'puntoEntrega', 'type': 'String' },
    { 'attr': 'nombreEstado',       'type': 'String' }
  ];


  public arrControls = ['id', 'Fecha alta', 'Afiliado', 'CUIL', 'Apellido', 'Nombre', 'Lugar entrega', 'Estado'];


  public options = {
    'entity': 'vwSolicitudes',
    'arrAttr': this.arrAttr,
    'arrControls': this.arrControls,
    'buttons': [
      { 'url': 'admin/cambiar-estado', 'title': 'Cambiar estado' }
    ],
    'reload': null
  }

  constructor() { }

  ngOnInit() {
  }

  public handleEvents(event) {
    console.log(event);
    
    if(event.control == 'Cambiar estado') {
      this.objSolicitud = event.obj;
      $("#modalSolicitud").modal("show");
    }
  }

  public editSuccess(result) {
    if(result) {
      $("#modalSolicitud").modal("hide");
      this.reloadGrid.next();
    }
  }

}
