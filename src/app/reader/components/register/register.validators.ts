import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

export function passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.value;

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumeric = /[0-9]/.test(password);
  const hasNonAlphanumeric = /[\W_]/.test(password);

  const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasNonAlphanumeric;

  return !passwordValid ? {
    passwordStrength: {
      hasUpperCase,
      hasLowerCase,
      hasNumeric,
      hasNonAlphanumeric,
    }
  } : null;
}

export function passwordMatchValidator(form: FormGroup): ValidationErrors | null {
  return form.get('password')?.value === form.get('confirmPassword')?.value 
    ? null : { mismatch: true };
}
