import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from '../../../services/state.service';
import { FxGlobalsService } from '../../../services/fx-globals.service';
import { TitularesService } from 'src/app/services/http/titulares.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EmpresasDelegadosService } from 'src/app/services/http/empresas-delegados.service';
declare var $;

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
    private _httpTitular: TitularesService,
    private _httpEmpresa: EmpresasDelegadosService) { }

  ngOnInit() {
    this.forma = new FormGroup({
      'numAfiliado': new FormControl('', [Validators.required, Validators.min(1111), Validators.max(9999)]),
      'cuil': new FormControl('', [Validators.required, this.validarCuit], this.asyncValidarCuilRegistrado.bind(this)),
      'apellido': new FormControl('', Validators.required),
      'nombre': new FormControl('', Validators.required),
      'domicilio': new FormControl('', Validators.required),
      'localidad': new FormControl('', Validators.required),
      'cuitEmpresa': new FormControl('', [Validators.required, this.validarCuit]),
      'razonSocialEmpresa': new FormControl(''),
      'telefono': new FormControl(''),
      'celular': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email])
    });

    /*this.forma.setValue({
      'numAfiliado': 8116,
      'cuil': 20375584973,
      'apellido': 'Wilson',
      'nombre': 'Mariano',
      'domicilio': 'Hunter 1034',
      'localidad': 'Adrogué',
      'cuitEmpresa': 20375584973,
      'razonSocialEmpresa': 'SECAB',
      'telefono': 1123896955,
      'celular': 1123896955,
      'email': 'mgw009@gmail.com'
    });*/

    this._state.consultarTitular() && this.forma.setValue(this._state.consultarTitular());
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

  public validarCuit(control: FormControl) {

    const cuit = control.value;
    const error = { cuitInvalid: true };

    //Compruebo que tenga 11 digitos
    if(cuit == undefined || !/[0-9]{11}/.test(cuit.toString()))
      return error;

    const cuitStr = cuit.toString();
    const verificador = parseInt(cuitStr[10]);
    const coeficiente = "54327654320";

    //  Mutiplico cada posicion del cuit por la misma posicion del coeficiente
    const arrMultiplicado = Array.from(cuitStr).map(
        (element: number, i) => element * parseInt(coeficiente[i])
    );

    //  Suma todos los elementos del array
    const suma = arrMultiplicado.reduce(
        (acumulator, currentValue) => acumulator + currentValue
    );
    
    const resto = suma % 11;

    if(verificador == (11 - resto) || resto === verificador) {
      return null;
    } else {
      return error;
    }
  }

  private asyncValidarCuilRegistrado(control: AbstractControl): Observable<any> {
    let cuil = control.value;

    return this._httpTitular.getOne(cuil)
      .pipe(
        map((isUsed) => {
          return !isUsed ? null : {
            cuilRegistrado: true
        };
        })
      );
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


