import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-pages-admin',
  templateUrl: './pages-admin.component.html',
  styleUrls: ['./pages-admin.component.css']
})
export class PagesAdminComponent implements OnInit {

  public url: string;

  constructor(
    public _data: DataService,
    public router: Router
    ) { }

  ngOnInit() {
    this.url = this.router.url;
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)).subscribe(
      () => this.url = this.router.url
    );
  }

}
