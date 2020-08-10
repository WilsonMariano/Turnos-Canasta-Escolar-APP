import { Component, OnInit } from '@angular/core';
import { faEdit, faEraser } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public faEdit =  faEdit;
  public faAddressCard = faAddressCard;
  public faEraser = faEraser;

  ngOnInit() {

  }
}
