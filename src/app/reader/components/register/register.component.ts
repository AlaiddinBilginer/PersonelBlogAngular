import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordStrengthValidator, passwordMatchValidator } from './register.validators';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr.service';
import { RegisterUserRequest } from '../../../contracts/user/register-user/register-user-request';
import { RegisterUserSuccessResponse } from '../../../contracts/user/register-user/register-user-success-response';
import { RegisterUserErrorResponse } from '../../../contracts/user/register-user/register-user-error-response';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: CustomToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), passwordStrengthValidator]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: passwordMatchValidator
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.spinner.show();
      const registerUserRequest: RegisterUserRequest = this.registerForm.value;

      this.authService.register(registerUserRequest).subscribe({
        next: response => this.handleSuccess(response),
        error: error => this.handleError(error)
      });
    } else {
      this.toastrService.message("Hatalı değerler girdiniz", "Hata", {
        toastrMessageType: ToastrMessageType.Error,
        toastrPosition: ToastrPosition.BottomRight
      })
    }
  }

  private handleSuccess(response: RegisterUserSuccessResponse | RegisterUserErrorResponse) {
    if(response.succeeded) {
      this.router.navigate(['/']);
      this.toastrService.message(response.message, "Kayıt Başarılı", {
        toastrMessageType: ToastrMessageType.Success,
        toastrPosition: ToastrPosition.BottomRight
      });
    } else {
      this.toastrService.message(response.message, "Kayıt Başarısız", {
        toastrMessageType: ToastrMessageType.Error,
        toastrPosition: ToastrPosition.BottomRight
      });
    }
    this.spinner.hide();
  }

  private handleError(error: any) {
    console.log("aaa");
    this.toastrService.message(error.message, "Kayıt Başarısız", {
      toastrMessageType: ToastrMessageType.Error,
      toastrPosition: ToastrPosition.BottomRight
    });
    this.spinner.hide();
  }
}
