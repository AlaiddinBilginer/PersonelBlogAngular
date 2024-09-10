import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/models/user.service';
import { Router } from '@angular/router';
import { LoginUserRequest } from '../../../contracts/user/login-user/login-user-request';
import { LocalStorageService } from '../../../services/common/local-storage.service';
import { Token } from '../../../contracts/token/token';
import { AuthService } from '../../../services/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private toastrService: CustomToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.loginForm = this.formBuilder.group({
      emailOrUsername: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.spinner.show();
      const loginUser: LoginUserRequest = this.loginForm.value;

      this.userService.login(loginUser).subscribe({
        next: response => this.handleSuccess(response),
        error: error => this.handleError(error)
      })

    } else {
      this.toastrService.message("Geçersiz değerler girdiniz", "Hata", {
        toastrMessageType: ToastrMessageType.Error,
        toastrPosition: ToastrPosition.BottomLeft
      })
    }
  }

  private handleSuccess(response: any) {
    if(response.succeeded) {
      const token: Token = response.token;
      this.localStorageService.set("accessToken", token.accessToken);
      this.router.navigate(["/"]);
      this.authService.checkIdentity();
      this.toastrService.message("Başarı ile giriş yapıldı", "Giriş Başarılı", {
        toastrMessageType: ToastrMessageType.Success,
        toastrPosition: ToastrPosition.BottomRight
      });
    } else {
      this.toastrService.message(response.message, "Giriş Başarısız", {
        toastrMessageType: ToastrMessageType.Error,
        toastrPosition: ToastrPosition.BottomLeft
      });
    }
    this.spinner.hide();
  }

  private handleError(error: any) {
    this.toastrService.message(error, "Giriş Başarısız", {
      toastrMessageType: ToastrMessageType.Error,
      toastrPosition: ToastrPosition.TopCenter
    });
    this.spinner.hide();
  }

}
