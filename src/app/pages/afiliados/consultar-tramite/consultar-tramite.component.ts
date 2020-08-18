import { Component, OnInit } from '@angular/core';
import { faThemeisle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-consultar-tramite',
  templateUrl: './consultar-tramite.component.html',
  styleUrls: ['./consultar-tramite.component.css']
})
export class ConsultarTramiteComponent implements OnInit {

  public resultado = null;
  public cuil: number;
  
  constructor() { }

  ngOnInit() {
  }

  public consultar() {
    this.resultado = true;
    console.log(this.cuil);
  }

}
