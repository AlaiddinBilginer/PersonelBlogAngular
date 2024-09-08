import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/models/user.service';
import { User } from '../../../entities/user';
import { passwordStrengthValidator, passwordMatchValidator } from './register.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
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
      const user: User = this.registerForm.value;

      this.userService.register(user).subscribe({
        next: response => this.handleSuccess(response),
        error: error => this.handleError(error)
      });
    } else {
      console.log('Form is invalid');
    }
  }

  private handleSuccess(response: any) {
    console.log(response.message);
    this.router.navigate(['/']);
  }

  private handleError(error: any) {
    console.log(error.message);
  }
}
