import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  public bdColor = "rgb(0,83,135)";
  public size = "medium";
  public color = "#fff";
  public type = "square-jelly-box";
  public fullScreen = true;
  public text = "Cargando...";

  constructor() { }

  ngOnInit() {
  }

}
