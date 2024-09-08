import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { User } from '../../entities/user';
import { RegisterUser } from '../../contracts/user/register-user';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClientService: HttpClientService
  ) { }

  register(user: User) : Observable<RegisterUser> {
    return this.httpClientService.post<RegisterUser | User>({
      controller: 'users',
      action: 'register'
    }, user).pipe(
      map((response: RegisterUser | User) => response as RegisterUser) 
    );
  }
}
