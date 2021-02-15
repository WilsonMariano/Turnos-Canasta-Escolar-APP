import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/http/usuario.service';
import { FxGlobalsService } from 'src/app/services/fx-globals.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _router: Router,
    private _http: UsuarioService,
    private _fx: FxGlobalsService) { }

  ngOnInit() {
  }

  login(emailCtrl, passwordCtrl) {
    const email = emailCtrl.control.value;
    const password = passwordCtrl.control.value;

    this._http.login(email, password)
      .subscribe(
        data => {
          localStorage.setItem('token', data);
          this._router.navigate(['/admin/grilla-solicitudes']);
        },
        err => this._fx.showAlert("Usuario inválido", "Los datos ingresados son incorrectos", "error", 500)
      );
  }

}
