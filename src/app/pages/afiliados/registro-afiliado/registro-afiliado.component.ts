import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from '../../../services/state.service';
import { FxGlobalsService } from '../../../services/fx-globals.service';

@Component({
  selector: 'app-registro-afiliado',
  templateUrl: './registro-afiliado.component.html',
  styleUrls: ['./registro-afiliado.component.css']
})
export class RegistroAfiliadoComponent implements OnInit {

  public forma: FormGroup;
  public urls = [{
    name: "Datos del afiliado",
    url: 'afiliados/registro-afiliado'
  }]

  constructor(
    private router: Router, 
    private _state: StateService,
    private _fx: FxGlobalsService) { }

  ngOnInit() {
    this.forma = new FormGroup({
      'numAfiliado': new FormControl(''),
      'cuil': new FormControl('', Validators.required),
      'apellido': new FormControl('', Validators.required),
      'nombre': new FormControl('', Validators.required),
      'domicilio': new FormControl('', Validators.required),
      'localidad': new FormControl('', Validators.required),
      'cuitEmpresa': new FormControl('', Validators.required),
      'razonSocialEmpresa': new FormControl(''),
      'telefono': new FormControl(''),
      'celular': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email])
    });

    this.forma.setValue(this._state.consultarTitular() || {});
  }

  public submit() {
    this._fx.alertConfirm("Confirmación", "¿Los datos son correctos?", "warning")
      .then(() => {
            this._state.guardarTitular(this.forma.value);

            if(this._state.consultarFamiliares().length == 0) {
              this.router.navigate(['afiliados/registro-familiar']);
            
            } else {
              this.router.navigate(['afiliados/listado-carga']);
            }
      })
      .catch(() => {});
  }

}
