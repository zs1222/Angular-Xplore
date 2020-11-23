import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private loginService: LoginService) {}

  canActivate(): boolean {
    const token = this.loginService.getAccessToken();
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
