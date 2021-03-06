import { Component, OnInit } from '@angular/core';
import { faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { CronogramaService } from 'src/app/services/http/cronograma.service';

@Component({
  selector: 'app-consultar-tramite',
  templateUrl: './consultar-tramite.component.html',
  styleUrls: ['./consultar-tramite.component.css']
})
export class ConsultarTramiteComponent implements OnInit {

  public resultado = null;
  public cuil: number;
  
  public faCalendar = faCalendarAlt;
  public faMapMarker = faMapMarkerAlt;

  constructor(private _http: CronogramaService) { }

  ngOnInit() {}

  public consultar() {
    if(this.cuil != null) {
      this._http.getOne(this.cuil)
        .subscribe( 
          data => 
            setTimeout(() => this.resultado = data, 500),
          err => this.resultado = false
        )
    }
    } 

}
