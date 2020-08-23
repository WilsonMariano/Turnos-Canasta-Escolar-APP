import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { GenericService } from 'src/app/services/http/generic.service';

@Component({
  selector: 'app-modal-solicitud',
  templateUrl: './modal-solicitud.component.html',
  styleUrls: ['./modal-solicitud.component.css']
})
export class ModalSolicitudComponent implements OnInit, OnChanges {
  @Input() solicitud = null;
  @Output() success = new EventEmitter();

  public forma: FormGroup;
  
  constructor(
    public _data: DataService,
    private _http: GenericService) { }

  ngOnInit() {
    this.forma = new FormGroup({
      'id': new FormControl(''),
      'estado': new FormControl(),
      'fechaEntrega': new FormControl(''),
      'horaEntrega': new FormControl(''),
      'observaciones': new FormControl(''),
      'idTitular': new FormControl(''),
      'idPuntoEntrega': new FormControl('')
      
    });
  }

  ngOnChanges() {

    if(this.solicitud != null) {
      this.forma.get('id').setValue(this.solicitud.id);
      this.forma.get('estado').setValue(this.solicitud.estado);
      this.forma.get('fechaEntrega').setValue(this.solicitud.fechaEntrega);
      this.forma.get('horaEntrega').setValue(this.solicitud.horaEntrega);
      this.forma.get('observaciones').setValue(this.solicitud.observaciones);
      this.forma.get('idTitular').setValue(this.solicitud.idTitular);
      this.forma.get('idPuntoEntrega').setValue(this.solicitud.idPuntoEntrega);
      this.changeEstado();
    }
  }

  public submit() {
    this._http.putOne('Cronograma', this.forma.getRawValue())
      .subscribe(
        data => this.success.emit(true)
      )
  }

  public changeEstado() {
    if(this.forma.get('estado').value !== 'ESTADO_SOLICITUD_2') {
      this.forma.get('fechaEntrega').disable();
      this.forma.get('horaEntrega').disable();
      
    } else {
      this.forma.get('fechaEntrega').enable();
      this.forma.get('horaEntrega').enable();
    }
  }


}
