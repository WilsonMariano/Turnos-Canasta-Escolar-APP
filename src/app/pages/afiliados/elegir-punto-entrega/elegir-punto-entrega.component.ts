import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../services/state.service';
import { DataService } from 'src/app/services/data.service';
declare var mapboxgl;

@Component({
  selector: 'app-elegir-punto-entrega',
  templateUrl: './elegir-punto-entrega.component.html',
  styleUrls: ['./elegir-punto-entrega.component.css']
})
export class ElegirPuntoEntregaComponent implements OnInit {

  public abrirModal = false;
  public map = null;
  private marker = null; 


  constructor(
    public _state: StateService,
    public _data: DataService) { }

  ngOnInit() {
    // Init map
    mapboxgl.accessToken = 'pk.eyJ1IjoicGVwdXNhIiwiYSI6ImNrZHJramNmMTBiMzEydXE5N2d5dXV2N2cifQ.r8I-XyG1Mjo2odf1xUEshw';
    this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', 
        center: [0, 0], 
        zoom: 14 
    });

    let puntoGuardado = this._state.consultarPuntoEntrega();
    puntoGuardado && this.setMarker(puntoGuardado);
  }

  public guardarPuntoEntrega(puntoEntrega) {
    this._state.guardarPuntoEntrega(puntoEntrega);
    this.setMarker(puntoEntrega);
  }

  private setMarker(puntoEntrega) {
    if(this.marker){
      this.marker.remove();
    }

    this.map.setCenter(puntoEntrega.lnglat);
    this.marker = new mapboxgl.Marker()
      .setLngLat(puntoEntrega.lnglat)
      .addTo(this.map);
  }

  public finalizarTramite() {
    this.abrirModal = true;
  }
}
