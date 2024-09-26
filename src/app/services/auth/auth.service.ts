import { Injectable } from '@angular/core';
import { RegisterUserRequest } from '../../contracts/user/register-user/register-user-request';
import { Observable } from 'rxjs';
import { RegisterUserSuccessResponse } from '../../contracts/user/register-user/register-user-success-response';
import { RegisterUserErrorResponse } from '../../contracts/user/register-user/register-user-error-response';
import { HttpClientService } from '../common/http-client.service';
import { LoginUserRequest } from '../../contracts/user/login-user/login-user-request';
import { LoginUserSuccessResponse } from '../../contracts/user/login-user/login-user-success-response';
import { LoginUserErrorResponse } from '../../contracts/user/login-user/login-user-error-response';
import { RefreshTokenSuccessResponse } from '../../contracts/token/refresh-token/refresh-token-success-response';
import { RefreshTokenErrorResponse } from '../../contracts/token/refresh-token/refresh-token-error-response';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClientService: HttpClientService
  ) { }

  register(registerUserRequest: RegisterUserRequest) : Observable<RegisterUserSuccessResponse | RegisterUserErrorResponse> {
    return this.httpClientService.post<RegisterUserSuccessResponse | RegisterUserErrorResponse>({
      controller: 'auth',
      action: 'register'
    }, registerUserRequest);
  }

  login(loginUserRequest: LoginUserRequest) : Observable<LoginUserSuccessResponse | LoginUserErrorResponse> {
    return this.httpClientService.post<LoginUserSuccessResponse | LoginUserErrorResponse>({
      controller: 'auth',
      action: 'login'
    }, loginUserRequest);
  }

  refreshToken(refreshToken: string): Observable<RefreshTokenSuccessResponse | RefreshTokenErrorResponse> {
    return this.httpClientService.post<RefreshTokenSuccessResponse | RefreshTokenErrorResponse>({
      controller: 'auth',
      action: 'refreshToken'
    }, {refreshToken});
  }
}
