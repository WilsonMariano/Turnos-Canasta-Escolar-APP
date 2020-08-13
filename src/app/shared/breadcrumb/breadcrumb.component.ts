import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { RoutesService } from 'src/app/services/shared/routes.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  public routes = [];
  public faAngleRight = faAngleRight;

  constructor(
    private _routes: RoutesService,
    private _router: Router
    ) { }

  ngOnInit() {
    
    this.cargarRutas();

    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.cargarRutas();
      }
    })
  }

  private cargarRutas() {
    this.routes = [];
    
    for(let i = 0; i < this._routes.pages.length; i++) {
      this.routes.push(this._routes.pages[i]);
      
      if(this._routes.pages[i].url == this._router.url) {
        break;
      }
    }
  }
}
