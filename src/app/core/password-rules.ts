import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Shown next to password fields — matches `passwordStrengthValidator`. */
export const PASSWORD_RULES_HINT =
  'At least 8 characters, one uppercase letter, and one digit.';

/** Mock-app rule: length, one uppercase letter, one digit (no special-character requirement). */
export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const v = control.value as string;
    if (v == null || v === '') {
      return null;
    }
    if (v.length < 8) {
      return { passwordLength: true };
    }
    if (!/[A-Z]/.test(v)) {
      return { passwordUppercase: true };
    }
    if (!/\d/.test(v)) {
      return { passwordDigit: true };
    }
    return null;
  };
}

/** Use on the form group that contains `newPassword` and `confirmPassword`. */
export function newPasswordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const group = control as FormGroup;
    const n = group.get('newPassword')?.value as string | undefined;
    const c = group.get('confirmPassword')?.value as string | undefined;
    if (!n?.length || !c?.length) {
      return null;
    }
    return n === c ? null : { passwordMismatch: true };
  };
}

export function validatePasswordStrengthOrThrow(password: string): void {
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters.');
  }
  if (!/[A-Z]/.test(password)) {
    throw new Error('Password must include at least one uppercase letter.');
  }
  if (!/\d/.test(password)) {
    throw new Error('Password must include at least one digit.');
  }
}
