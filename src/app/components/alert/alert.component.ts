import { Component, OnInit } from '@angular/core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  public faExclamation = faExclamationTriangle;
  public text = "Recordá revisar que la información sea correcta, una vez enviada no podrá ser modificada.";

  constructor() { }

  ngOnInit() {
  }

}
