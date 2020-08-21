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


  /*************MEJORAR FUNCIÓN******************/
  public validarCuit(control: FormControl) {

    let cuit = control.value;

    let error = {
      cuitInvalid: true
    };

    //Compruebo que tenga 11 digitos
    if(cuit == undefined || !/[0-9]{11}/.test(cuit.toString()))
      return error;

    let cadena: string = cuit.toString();
    let coeficiente: string = "5432765432"
    let suma = 0;

    for(let i = 0; i < cadena.length-1; i++) {
      suma += parseInt(cadena[i]) * parseInt(coeficiente[i]);
    }
    
    let resto = suma % 11;

    if(resto == 0 && cadena[cadena.length-1] == "0")
      return null;
    
    if(parseInt(cadena[cadena.length-1]) == 11 - resto) {
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
      this._fx.showAlert("Empresa con delegado", "Los productos serán entregados por el delegado de tu empresa", "warning", 500);
    }
    return exists;
  }

}


