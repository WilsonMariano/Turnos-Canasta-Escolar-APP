import { ValidatorsService } from './../../services/validators.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-buscar-solicitud',
  templateUrl: './modal-buscar-solicitud.component.html',
  styleUrls: ['./modal-buscar-solicitud.component.css']
})
export class ModalBuscarSolicitudComponent implements OnInit {
  @Output() success = new EventEmitter();

  public forma: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _validators: ValidatorsService,
    ) { }

  ngOnInit() {
    this.forma = this.fb.group({
      cuil: ['', this._validators.validarCuit]
    });
  }

  public submit(): void {
    this.success.emit(this.forma.get('cuil').value);
  }
}
