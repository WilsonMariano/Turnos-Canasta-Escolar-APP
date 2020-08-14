import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-pages-afiliados',
  templateUrl: './pages-afiliados.component.html',
  styles: []
})
export class PagesAfiliadosComponent implements OnInit {


  constructor(private _router: Router) { }

  ngOnInit() {

    this.scrollTop();

    this._router.events.subscribe((evt) => {
      if (event instanceof NavigationEnd) {
          this.scrollTop();
      }
    });
  }

  private scrollTop() {
    window.scrollTo(0, 0);
  }
}
