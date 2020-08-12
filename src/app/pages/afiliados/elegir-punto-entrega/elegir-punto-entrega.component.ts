import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../services/state.service';
declare var mapboxgl;

@Component({
  selector: 'app-elegir-punto-entrega',
  templateUrl: './elegir-punto-entrega.component.html',
  styleUrls: ['./elegir-punto-entrega.component.css']
})
export class ElegirPuntoEntregaComponent implements OnInit {

  public puntoEntrega = null;
  public abrirModal = false;
  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;

  constructor(private _state: StateService) { }


  ngOnInit() {
    this.puntoEntrega = this._state.consultarPuntoEntrega() || null;

    
    mapboxgl.accessToken = 'pk.eyJ1IjoicGVwdXNhIiwiYSI6ImNrZHJramNmMTBiMzEydXE5N2d5dXV2N2cifQ.r8I-XyG1Mjo2odf1xUEshw';
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [-58.388479, -34.801165], // starting position [lng, lat]
        zoom: 14 // starting zoom
    });

    var marker = new mapboxgl.Marker()
    .setLngLat([-58.388479, -34.801165])
    .addTo(map); // add the marker to the map

  }

  public guardarPuntoEntrega(puntoEntrega: string) {
    this.puntoEntrega = puntoEntrega;
    this._state.guardarPuntoEntrega(puntoEntrega);
  }

  public finalizarTramite() {
    this.abrirModal = true;
  }

}
