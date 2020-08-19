import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  login(emailCtrl, passwordCtrl) {
    let email = emailCtrl.control.value;
    let password = passwordCtrl.control.value;

    console.log(email, password);
    this._router.navigate(['/admin/grilla-solicitudes']);
  }

}
