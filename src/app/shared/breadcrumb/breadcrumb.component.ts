import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  @Input() urls = [];

  public routes = [];
  public faAngleRight = faAngleRight;

  constructor(private _router: Router) { }

  ngOnInit() {
    // console.log(this._router.url);
    
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(event);
      }
    })

    for(let i = 0; i < this._routes.length; i++) {
      this.routes.push(this._routes[i]);

      console.log(this._routes[i]);

      if(this._routes[i].url == this._router.url) {
        break;
      }
    }
    // this._routes.forEach(route => {
    //   this.routes.push(route);

    //   if(route.url == this._router.url)
    //     break;
    // });

  }

 
  
  public _routes = [
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
}
