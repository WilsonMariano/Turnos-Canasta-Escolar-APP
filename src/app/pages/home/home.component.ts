import { Component, OnInit } from '@angular/core';
import { faEdit, faEraser } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public faEdit =  faEdit;
  public faAddressCard = faAddressCard;
  public faEraser = faEraser;

  constructor() { }

  ngOnInit() {
  }

}
