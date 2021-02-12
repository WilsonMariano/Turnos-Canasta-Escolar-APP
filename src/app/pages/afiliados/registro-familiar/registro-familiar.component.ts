import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StateService } from '../../../services/state.service';
import { FxGlobalsService } from '../../../services/fx-globals.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
declare var moment;


@Component({
  selector: 'app-registro-familiar',
  templateUrl: './registro-familiar.component.html',
  styleUrls: ['./registro-familiar.component.css']
})
export class RegistroFamiliarComponent implements OnInit, OnDestroy {


  public forma: FormGroup;
  public edicion = null;

  constructor(
    private _router: Router,
    public _state: StateService,
    private _fx: FxGlobalsService,
    public _data: DataService
  ) { }

  ngOnInit() {
    this.forma = new FormGroup({
      'dni': new FormControl('', Validators.required),
      'apellido': new FormControl('', Validators.required),
      'nombre': new FormControl('', Validators.required),
      'sexo': new FormControl('', Validators.required),
      'fechaNacimiento': new FormControl('', [Validators.required, this.validarFechaNacimiento]),
      'edad': new FormControl({ value: '', disabled: true }, [Validators.required, Validators.min(0), Validators.max(18)]),
      'nivelEducacion': new FormControl('', Validators.required),
      'usaGuardapolvo': new FormControl(false),
      'talleGuardapolvo': new FormControl({value: '', disabled: true}, Validators.required)
    });

    // Verifico si se recibe un familiar a editar
    this.edicion = JSON.parse(localStorage.getItem('familiarEditar')) || null;

    this.edicion && this.forma.setValue(this.edicion);
  }

  ngOnDestroy() {
    localStorage.removeItem('familiarEditar');
    this.forma.reset();
  }

  public submit() {
    this._fx.alertConfirm("Confirmación", "¿Los datos son correctos?", "warning")
      .then(() => {

        if (this._state.buscarFamiliar(this.forma.getRawValue())) {

          this._fx.showAlert("No se pudo agregar al familiar", "El dni ingresado ya se ha registrado anteriormente", "warning", 500);

        } else {
          this._state.guardarFamiliar(this.forma.getRawValue());

          this._fx.alertConfirm("Operación exitosa", "¿Desea agregar otro familiar?", "success", ['No', 'Si'])
            .then(() => {
              this.forma.reset();
            })
            .catch(() => {
              this._router.navigate(['afiliados/listado-carga']);
            })
        }
      })
      .catch(() => { });
  }

  public editar() {
    this._fx.alertConfirm("Confirmación", "¿Los datos son correctos?", "warning")
      .then(() => {
        this._state.editarFamiliar(this.edicion, this.forma.getRawValue());

        this._fx.showAlert("Operación exitosa", "El familiar se ha editado exitosamente", "success");
        this._router.navigate(['afiliados/listado-carga']);
      })
      .catch(() => { });
  }


  public calcularEdad() {
    let fecha = this.forma.get('fechaNacimiento').value;

    if (fecha != '') {
      let edad = moment().diff(fecha, 'years');
      this.forma.controls.edad.setValue(edad);
    }
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

  public changeUsaGuardapolvo() {
    const value = <boolean>this.forma.get('usaGuardapolvo').value;
    const control = this.forma.get('talleGuardapolvo');

    if(value) {
      control.enable();
    } else {
      control.disable();
      control.setValue('');
    }
  }

  // TODO MEJORAR
  public changeNivelEducacion() {
    const value = this.forma.get('nivelEducacion').value;
    const talleGuardapolvoControl =  this.forma.get('talleGuardapolvo');
    const usaGuardapolvoControl = this.forma.get('usaGuardapolvo');

    // Si es distinto a Preescolar, Primaria o Secundaria, deshabilito el guardapolvo MEJORAR!!!
    if(value !== 'NIVEL_EDUCACION_2' && value !== 'NIVEL_EDUCACION_3' && value != 'NIVEL_EDUCACION_4' && value != 'NIVEL_EDUCACION_5') {
      talleGuardapolvoControl.disable();
      talleGuardapolvoControl.setValue('');
      usaGuardapolvoControl.disable();
      usaGuardapolvoControl.setValue('');
    } else {
      usaGuardapolvoControl.enable();
    }
  }

  public navigateTo(url: string) {
    this._router.navigate([url]);
  }

}
