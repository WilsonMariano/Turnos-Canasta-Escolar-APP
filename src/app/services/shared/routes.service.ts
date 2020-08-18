import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  public pages = [
    {
      title: 'Datos del titular',
      subtitle: 'Completá el formulario con los datos del titular',
      url: '/afiliados/registro-afiliado',
      components: ['jumbotron', 'breadcrumb',  'alert']
    },
    {
      title: 'Datos del familiar',
      subtitle: 'Completá el formulario con los datos de tu hijo/a. Su edad debe estar entre 0 y 18 años',
      url: '/afiliados/registro-familiar',
      components: ['jumbotron', 'breadcrumb',  'alert']
    },
    {
      title: 'Confirmación de datos',
      subtitle: 'Revisá que los datos cargados sean correctos, caso contrario deberás modificarlos',
      url: '/afiliados/listado-carga',
      components: ['jumbotron', 'breadcrumb',  'alert']
    },
    {
      title: 'Punto de entrega',
      subtitle: 'Elegí el lugar por el cual retirarás los kits escolares y los juguetes',
      url: '/afiliados/elegir-punto-entrega',
      components: ['jumbotron', 'breadcrumb',  'alert']
    },
    {
      title: 'Consultar estado de solicitud',
      subtitle: 'Ingresá el cuil del titular y consultá el estado de tu trámite',
      url: '/afiliados/consultar-tramite',
      components: ['jumbotron']
    }
  ];

  constructor() { }

  public evalComponentes(ruta: string, componente: string) {
    let flag = false;
    this.pages.map(page => {
      if(page.url == ruta) {
        flag = page.components.find(c => c === componente) ? true : false;
      }
    });
    return flag;
  }
}
