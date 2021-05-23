import { ValidatorsService } from './../../../services/validators.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from '../../../services/state.service';
import { FxGlobalsService } from '../../../services/fx-globals.service';
import { EmpresasDelegadosService } from 'src/app/services/http/empresas-delegados.service';
import { ITitular } from './models';
declare const $;

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
    private _fx: FxGlobalsService,
    private _validators: ValidatorsService,
    private _httpEmpresa: EmpresasDelegadosService) { }

  ngOnInit() {
    this.forma = new FormGroup({
      'id': new FormControl(''),
      'fechaAlta': new FormControl(''),
      'numAfiliado': new FormControl('8116', [Validators.required, Validators.min(11), Validators.max(99999)]),
      'cuil': new FormControl('20375584973', [Validators.required, this._validators.validarCuit]),
      'apellido': new FormControl('Wilson', Validators.required),
      'nombre': new FormControl('Mariano', Validators.required),
      'domicilio': new FormControl('Segurola 844', Validators.required),
      'localidad': new FormControl('CABA', Validators.required),
      'cuitEmpresa': new FormControl('30549493196', [Validators.required, this._validators.validarCuit]),
      'razonSocialEmpresa': new FormControl('SECAB'),
      'telefono': new FormControl('42932851'),
      'celular': new FormControl('1123589654', Validators.required),
      'email': new FormControl('mgw009@gmail.com', [Validators.required, Validators.email])
    });

    // this.forma.setValue({
    //   id: 1,
    //   fechaAlta: '2021-05-22',
    //   numAfiliado: "8116",
    //   cuil: "20375584973",
    //   apellido: "Wilson",
    //   nombre: "Mariano",
    //   domicilio: "Segurola 844",
    //   localidad: "CABA",
    //   cuitEmpresa: "30549493196",
    //   razonSocialEmpresa: "SECAB",
    //   telefono: "42932851",
    //   celular: "1123589654",
    //   email: "mgw009@gmail.com",
    // })


    this._state.consultarTitular()
      && this.forma.setValue(this._state.consultarTitular());

    this._state.consultarOperationType() === 'alta'
      ? this.forma.get('cuil').setAsyncValidators(this._validators.asyncValidarCuilRegistrado.bind(this._validators))
      : this.forma.get('cuil').disable();

    $('#numAfiliado').tooltip();
  }

  public submit() {
    this._fx.alertConfirm("Confirmación", "¿Los datos son correctos?", "warning")
      .then(async () => {

        let tieneDelegado = await this.validarEmpresaDelegado();
        
        if(!tieneDelegado) {
          this._state.guardarTitular(this.forma.getRawValue());
          this._fx.showToast("Titular agregado correctamente", "success");

          if(this._state.consultarFamiliares().length == 0) {
            this.router.navigate(['afiliados/registro-familiar']);
          
          } else {
            this.router.navigate(['afiliados/listado-carga']);
          }
        }        
      })
      .catch(() => {});
  }

  private async validarEmpresaDelegado() {
    let cuit = this.forma.get('cuitEmpresa').value;
    let exists = await this._httpEmpresa.getOne(cuit).toPromise();
    
    if(exists) {
      this._fx.showAlert("No podés registarte", "Los productos serán entregados directamente por el delegado de tu empresa.", "error", 500);
    }
    return exists;
  }

}


