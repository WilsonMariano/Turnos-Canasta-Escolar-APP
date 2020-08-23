import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-pages-admin',
  templateUrl: './pages-admin.component.html',
  styleUrls: ['./pages-admin.component.css']
})
export class PagesAdminComponent implements OnInit {

  constructor(_data: DataService) { }

  ngOnInit() {
  }

}
