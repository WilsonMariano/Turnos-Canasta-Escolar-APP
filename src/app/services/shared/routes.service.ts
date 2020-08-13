import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  public pages = [
    {
      title: 'Datos del titular',
      subtitle: 'Completá el formulario con los datos del titular',
      url: '/afiliados/registro-afiliado'
    },
    {
      title: 'Datos del familiar',
      subtitle: 'Completá el formulario con los datos de tu hijo/a. Su edad debe estar entre 0 y 18 años',
      url: '/afiliados/registro-familiar'
    },
    {
      title: 'Confirmación de datos',
      subtitle: 'Revisá que los datos cargados sean correctos, caso contrario deberás modificarlos',
      url: '/afiliados/listado-carga'
    },
    {
      title: 'Punto de entrega',
      subtitle: 'Elegí el lugar por el cual retirarás los kits escolares y los juguetes',
      url: '/afiliados/elegir-punto-entrega'
    }
  ]

  constructor() { }
}
