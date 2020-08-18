import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RoutesService } from 'src/app/services/shared/routes.service';


@Component({
  selector: 'app-pages-afiliados',
  templateUrl: './pages-afiliados.component.html',
  styles: []
})
export class PagesAfiliadosComponent implements OnInit {

  public jumbotron = true;
  public breadcrumb = true;
  public alert = true;

  constructor(
    private _router: Router,
    private _routes: RoutesService) { }

  ngOnInit() {

    this.scrollTop();
    this.consultarComponentes();

    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.consultarComponentes();
        this.scrollTop();
      }
    });
  }

  private scrollTop() {
    window.scrollTo(0, 0);
  }

  private consultarComponentes() {
    this.breadcrumb = this._routes.evalComponentes(this._router.url, 'breadcrumb');
    this.jumbotron = this._routes.evalComponentes(this._router.url, 'jumbotron');
    this.alert = this._routes.evalComponentes(this._router.url, 'alert');
  }
}
