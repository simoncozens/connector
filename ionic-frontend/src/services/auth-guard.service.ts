// auth-guard.service.ts

import { Injectable } from '@angular/core';
// import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard {

  constructor(private auth: AuthService) {}

  canActivate() {
    if (this.auth.loggedIn()) {
      return true;
    } else {
      return false;
    }
  }
}
