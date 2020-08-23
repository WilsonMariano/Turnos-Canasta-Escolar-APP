import { Component, OnInit } from '@angular/core';
import { RoutesService } from 'src/app/services/shared/routes.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css']
})
export class JumbotronComponent implements OnInit {

  public title: string;
  public subtitle: string;

  constructor(
    private _routes: RoutesService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.cargarTitulos();

    this._router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.cargarTitulos();
      }
    });
  }

  private cargarTitulos() {
    this._routes.pages.map(page => {
      if(page.url == this._router.url){
        this.title = page.title
        this.subtitle = page.subtitle;
      }
    });
  }
}
