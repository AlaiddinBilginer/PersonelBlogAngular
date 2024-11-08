import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './common/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  private _isAuthenticated: boolean = false;

  constructor(
    private jwtHelper: JwtHelperService,
    private localStorageService: LocalStorageService
  ) {
    this.checkIdentity();
  }

  checkIdentity() {
    const token: string | null = this.localStorageService.get("accessToken");

    let isExpired: boolean;

    try {
      isExpired = token ? this.jwtHelper.isTokenExpired(token) : true;
    } catch {
      isExpired = true;
    }

    this._isAuthenticated = token !== null && !isExpired;    
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  getUserName(): string | null {
    const token = this.localStorageService.get("accessToken");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || null;
    }
    return null;
  }

  getUserId(): string | null {
    const token = this.localStorageService.get("accessToken");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || null;
    }
    return null;
  }

  getProfilePicture(): string | null {
    const token = this.localStorageService.get("accessToken");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken['ProfilePictureUrl'] || null;
    }
    return null;
  }
}
