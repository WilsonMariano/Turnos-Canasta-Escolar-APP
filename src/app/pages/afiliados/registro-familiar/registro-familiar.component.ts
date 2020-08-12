import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StateService } from '../../../services/state.service';
import { FxGlobalsService } from '../../../services/fx-globals.service';
import { Router } from '@angular/router';


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
    private _state: StateService,
    private _fx: FxGlobalsService
  ) { }

  ngOnInit() {
    this.forma = new FormGroup({
      'dni': new FormControl('', Validators.required),
      'apellido': new FormControl('', Validators.required),
      'nombre': new FormControl('', Validators.required),
      'sexo': new FormControl('', Validators.required),
      'fechaNacimiento': new FormControl('', Validators.required),
      'edad': new FormControl('', Validators.required),
      'nivelEducacion': new FormControl('', Validators.required)
    });

    // Verifico si se recibe un familiar a editar
    this.edicion = JSON.parse(localStorage.getItem('familiarEditar')) || null;
    console.log(this.edicion);
    this.forma.setValue(this.edicion);
  }

  ngOnDestroy() {
    localStorage.removeItem('familiarEditar');
    this.forma.reset();
  }

  public submit() {
    this._fx.alertConfirm("Confirmación", "¿Los datos son correctos?", "warning")
      .then(() => {
             this._state.guardarFamiliar(this.forma.value);

            this._fx.alertConfirm("Operación exitosa", "¿Desea agregar otro familiar?", "success")
              .then(() => {
                this.forma.reset();
              })
              .catch(() => {
                this._router.navigate(['afiliados/listado-carga']);
              })
      })
      .catch(() => {});
  }

  public editar() {
    this._fx.alertConfirm("Confirmación", "¿Los datos son correctos?", "warning")
      .then(() => {
        this._state.editarFamiliar(this.edicion, this.forma.value);

          this._fx.alert("Operación exitosa", "El familiar se ha editado exitosamente", "success");
          this._router.navigate(['afiliados/listado-carga']);
    })
    .catch(() => {});
  }
}
