import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './common/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  constructor(
    private jwtHelper: JwtHelperService,
    private localStorageService: LocalStorageService
  ) { }

  checkIdentity() {
    const token: string = this.localStorageService.get("accessToken");

    let isExpired: boolean;

    try {
      isExpired = this.jwtHelper.isTokenExpired(token);
    } catch {
      isExpired = true;
    }

    _isAuthenticated = token !== null && !isExpired;
  }

  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }
}

export let _isAuthenticated: boolean;
