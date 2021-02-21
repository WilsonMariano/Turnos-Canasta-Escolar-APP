import { AuthService } from './../../../services/auth/auth.service';
import { ExportsDataService } from './../../../services/exports-data.service';
import { FxGlobalsService } from 'src/app/services/fx-globals.service';
import { CronogramaService } from 'src/app/services/http/cronograma.service';
import { IsolicitudListado } from './model';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
declare const moment;

@Component({
  selector: 'app-exportar-listados',
  templateUrl: './exportar-listados.component.html',
  styleUrls: ['./exportar-listados.component.css']
})
export class ExportarListadosComponent implements OnInit {

  public formaCronograma: FormGroup;
  public formaListado: FormGroup;
  public faFileDownload = faFileDownload;
  constructor(
    private _auth: AuthService,
    public _data: DataService,
    private _fx: FxGlobalsService,
    private _http: CronogramaService,
    private _exportsData: ExportsDataService,
    private fb: FormBuilder) { }

  ngOnInit() {
    const user = this._auth.getData();
    this.formaCronograma = this.fb.group({
      'fechaDesde': ['', Validators.required],
      'fechaHasta': ['', Validators.required],
      'puntoEntrega': [user.idPuntoEntrega],
      'estado': ''
    });

    this.formaListado = this.fb.group({
      'fechaDesde': ['', Validators.required],
      'fechaHasta': ['', Validators.required],
      'puntoEntrega': [user.idPuntoEntrega],
      'estado': ''
    });

    if(user.role !== 'admin') {
      this.formaCronograma.get('puntoEntrega').disable();
      this.formaListado.get('puntoEntrega').disable();
    }
  }

  public exportarCronograma(): void {
    let solicitud: IsolicitudListado = this.formaCronograma.getRawValue();
    solicitud = this.formatDate(solicitud);

    this._http.getAllByFechaRetiro(solicitud).subscribe(
      data => this._exportsData.exportAsExcelFile(data, 'listado'), 
      err => this._fx.showAlert("Importante", `No se encontraron solicitudes, revise las fechas ingresadas`, "info", 500)
    );
  }

  public exportarListado(): void {
    let solicitud: IsolicitudListado = this.formaListado.getRawValue();
    solicitud = this.formatDate(solicitud);

    this._http.getAllByFechaAlta(solicitud).subscribe(
      data => this._exportsData.exportAsExcelFile(data, 'listado'), 
      err => this._fx.showAlert("Importante", `No se encontraron solicitudes, revise las fechas ingresadas`, "info", 500)
    );
  }

  private formatDate(solicitud: IsolicitudListado): IsolicitudListado {
    solicitud.fechaDesde = moment(solicitud.fechaDesde).set({hour: 0, minute: 0, second: 0}).format('YYYY-MM-DD HH:mm:ss');
    solicitud.fechaHasta = moment(solicitud.fechaHasta).set({hour: 23, minute: 59, second: 59}).format('YYYY-MM-DD HH:mm:ss');
    return solicitud;
  }
}
