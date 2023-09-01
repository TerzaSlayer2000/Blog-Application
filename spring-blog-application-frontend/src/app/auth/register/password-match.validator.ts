import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

 

export class PasswordMatchValidator {

 

static matchPassword(): ValidatorFn {

return (control: AbstractControl): ValidationErrors | null => {

const password = control.get('password');

const confirmPassword = control.get('confirmPassword');

 

// If either field is empty, or they don't match, return an error

return password && confirmPassword && password.value !== confirmPassword.value

? { passwordMismatch: true }

: null;

};

}

 

}