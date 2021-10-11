import { AbstractControl, ValidationErrors } from "@angular/forms"

export const PasswordStrengthValidator = function (control: AbstractControl): ValidationErrors | null {

    let value: string = control.value || '';

    if (!value) {
        return null
    }

    let upperCaseCharacters = /[A-Z]+/g
    if (upperCaseCharacters.test(value) === false) {
        return { passwordStrength: `one Upper case characters is required` };
    }

    let lowerCaseCharacters = /[a-z]+/g
    if (lowerCaseCharacters.test(value) === false) {
        return { passwordStrength: `one lower case characters is required` };
    }


    let numberCharacters = /[0-9]+/g
    if (numberCharacters.test(value) === false) {
        return { passwordStrength: `one number characters is required` };
    }

    let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
    if (specialCharacters.test(value) === false) {
        return { passwordStrength: `one special character is required ` };
    }
    return null;
}