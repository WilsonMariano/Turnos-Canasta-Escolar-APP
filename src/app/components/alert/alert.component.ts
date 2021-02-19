import { StateService } from './../../services/state.service';
import { Component, OnInit } from '@angular/core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  public faExclamation = faExclamationTriangle;
  public text: string;

  constructor(private _state: StateService) { }

  ngOnInit() {
    this._state.consultarOperationType() === 'editar'
      ? this.text = "Estás editando tu solicitud"
      : this.text = "Recordá que el día de retiro deberás llevar las constancias de alumno regular";
  }

}
