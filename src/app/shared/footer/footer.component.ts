import { Component, OnInit } from '@angular/core';
import { faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public faFacebook = faFacebook;
  public faInstagram = faInstagram;

  constructor() { }

  ngOnInit() {
  }

}
