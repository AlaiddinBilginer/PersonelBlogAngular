import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { Observable } from 'rxjs';
import { LoginUserRequest } from '../../contracts/user/login-user/login-user-request';
import { LoginUserSuccessResponse } from '../../contracts/user/login-user/login-user-success-response';
import { LoginUserErrorResponse } from '../../contracts/user/login-user/login-user-error-response';
import { RegisterUserRequest } from '../../contracts/user/register-user/register-user-request';
import { RegisterUserSuccessResponse } from '../../contracts/user/register-user/register-user-success-response';
import { RegisterUserErrorResponse } from '../../contracts/user/register-user/register-user-error-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClientService: HttpClientService
  ) { }

  register(registerUserRequest: RegisterUserRequest) : Observable<RegisterUserSuccessResponse | RegisterUserErrorResponse> {
    return this.httpClientService.post<RegisterUserSuccessResponse | RegisterUserErrorResponse>({
      controller: 'users',
      action: 'register'
    }, registerUserRequest);
  }

  login(loginUserRequest: LoginUserRequest) : Observable<LoginUserSuccessResponse | LoginUserErrorResponse> {
    return this.httpClientService.post<LoginUserSuccessResponse | LoginUserErrorResponse>({
      controller: 'users',
      action: 'login'
    }, loginUserRequest);
  }
}
