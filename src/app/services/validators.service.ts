import { TitularesService } from './http/titulares.service';
import { Observable } from 'rxjs';
import { FormControl, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
declare const moment;

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor(private _httpTitular: TitularesService) { }

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

  public asyncValidarCuilRegistrado(control: AbstractControl): Observable<any> {
    let cuil = control.value;

    return this._httpTitular.getOne(cuil)
      .pipe(
        map((isUsed) => {
          return !isUsed ? null : {
            cuilRegistrado: true};
        })
      );
  }

  public validarFechaNacimiento(control: FormControl) {

    let fechaIngresada = control.value;

    let edad = moment().diff(fechaIngresada, 'years');

    if (edad > 18 || edad < 0) {
      return {
        fechaInvalida: true
      }
    } else {
      return null;
    }
  }
}
