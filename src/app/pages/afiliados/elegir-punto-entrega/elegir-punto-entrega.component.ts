import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../services/state.service';
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

  public puntosEntrega = [
    {
      codigo: "SEC",
      nombre: "Sindicato Adrogué",
      domicilio: "Av. Espora 953, Adrogué",
      horario: "09:00 a 16:00 hs",
      lnglat: [-58.388479, -34.801165] 
    },
    {
      codigo: "CAM",
      nombre: "Campo Deportivo Burzaco",
      domicilio: "Pino 2085, Burzaco",
      horario: "09:00 a 16:00 hs",
      lnglat: [-58.420550, -34.822067] 
    },
    {
      codigo: "GUE",
      nombre: "Filial Guernica",
      domicilio: "Calle 101 N° 49, Guernica",
      horario: "09:00 a 16:00 hs",
      lnglat: [-58.382249, -34.915978] 
    },
    {
      codigo: "SAN",
      nombre: "Filial San Vicente",
      domicilio: "Belgrano 305, San Vicente",
      horario: "09:00 a 16:00 hs",
      lnglat: [-58.420288, -35.025269] 
    }
  ];

  constructor(private _state: StateService) { }

  ngOnInit() {

    // Init map
    mapboxgl.accessToken = 'pk.eyJ1IjoicGVwdXNhIiwiYSI6ImNrZHJramNmMTBiMzEydXE5N2d5dXV2N2cifQ.r8I-XyG1Mjo2odf1xUEshw';
    this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', 
        center: [0, 0], 
        zoom: 14 
    });
  }

  public guardarPuntoEntrega(puntoEntrega) {
    this._state.guardarPuntoEntrega(puntoEntrega.codigo);

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
