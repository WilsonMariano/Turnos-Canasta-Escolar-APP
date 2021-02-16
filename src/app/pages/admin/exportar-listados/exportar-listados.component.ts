import { AuthService } from './../../../services/auth/auth.service';
import { ExportsDataService } from './../../../services/exports-data.service';
import { FxGlobalsService } from 'src/app/services/fx-globals.service';
import { CronogramaService } from 'src/app/services/http/cronograma.service';
import { IsolicitudListado } from './model';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-exportar-listados',
  templateUrl: './exportar-listados.component.html',
  styleUrls: ['./exportar-listados.component.css']
})
export class ExportarListadosComponent implements OnInit {

  public forma: FormGroup;
  public faFileDownload = faFileDownload;
  constructor(
    private _auth: AuthService,
    private _data: DataService,
    private _fx: FxGlobalsService,
    private _http: CronogramaService,
    private _exportsData: ExportsDataService,
    private fb: FormBuilder) { }

  ngOnInit() {
    const user = this._auth.getData();
    this.forma = this.fb.group({
      'fechaDesde': ['2021-01-01', Validators.required],
      'fechaHasta': ['2021-02-20', Validators.required],
      'puntoEntrega': [user.idPuntoEntrega]
    });

    user.role !== 'admin'
      && this.forma.get('puntoEntrega').disable();
  }

  public submit(): void {
    const solicitud: IsolicitudListado = this.forma.getRawValue();
    this._http.getAllByFecha(solicitud).subscribe(
      data => this._exportsData.exportAsExcelFile(data, 'listado'), 
      err => this._fx.showAlert("Importante", `No se encontraron solicitudes, revise las fechas ingresadas`, "info", 500)
    );
  }



}
