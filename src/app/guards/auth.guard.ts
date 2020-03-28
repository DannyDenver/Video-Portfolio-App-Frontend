import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService) {}

  canActivate() {
    if (!this.authService.isTokenExpired()) {
      return true;
    }

    const loginLink = this.authService.build_login_link()

    window.open(loginLink, '_self');
    return false;
  }

}
