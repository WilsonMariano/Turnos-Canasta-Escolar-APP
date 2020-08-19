import { NgModule } from '@angular/core';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })
  ],
  providers: [
    AuthService,
    AuthGuardService
  ]
})

export class AuthModule {}