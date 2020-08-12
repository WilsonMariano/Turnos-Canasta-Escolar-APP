import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-elegir-punto-entrega',
  templateUrl: './elegir-punto-entrega.component.html',
  styleUrls: ['./elegir-punto-entrega.component.css']
})
export class ElegirPuntoEntregaComponent implements OnInit {

  public puntoEntrega = null;
  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;


  constructor() { }


  ngOnInit() {
  }

  public finalizarTramite() {
    console.log(this.puntoEntrega);
  }

}
