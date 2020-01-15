import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthErrorHandler implements ErrorHandler {

  constructor(
    private injector: Injector,
    private authService: AuthService
    ) { }

  handleError(error) {
    const router = this.injector.get(Router);
    if (error && error.rejection && error.rejection.status === 401) {
      const loginLink = this.authService.build_login_link()

      window.open(loginLink, '_self');
    }
    
    throw error;
  }
}