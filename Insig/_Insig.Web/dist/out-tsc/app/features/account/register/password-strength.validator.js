import { Validators } from '@angular/forms';
const upperCaseCharactersValidator = (control) => {
    const upperCaseCharacters = /[A-Z]+/g;
    if (control.value && upperCaseCharacters.test(control.value) === false) {
        return { upperCaseCharacters: { valid: false } };
    }
    return null;
};
const lowerCaseCharactersValidator = (control) => {
    const lowerCaseCharacters = /[a-z]+/g;
    if (control.value && lowerCaseCharacters.test(control.value) === false) {
        return { lowerCaseCharacters: { valid: false } };
    }
    return null;
};
const numberCharactersValidator = (control) => {
    const numberCharacters = /[0-9]+/g;
    if (control.value && numberCharacters.test(control.value) === false) {
        return { numberCharacters: { valid: false } };
    }
    return null;
};
const specialCharactersValidator = (control) => {
    const specialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    if (control.value && specialCharacters.test(control.value) === false) {
        return { specialCharacters: { valid: false } };
    }
    return null;
};
export class PasswordValidator {
}
PasswordValidator.strength = Validators.compose([
    upperCaseCharactersValidator,
    lowerCaseCharactersValidator,
    numberCharactersValidator,
    specialCharactersValidator,
    Validators.minLength(8)
]);
PasswordValidator.confirmed = (controlName, matchingControlName) => (control) => {
    const input = control.get(controlName);
    const matchingInput = control.get(matchingControlName);
    if (input === null || matchingInput === null) {
        return null;
    }
    if ((matchingInput === null || matchingInput === void 0 ? void 0 : matchingInput.errors) && !matchingInput.errors.confirmedValidator) {
        return null;
    }
    if (input.value !== matchingInput.value) {
        matchingInput.setErrors({ confirmedValidator: true });
        return { confirmedValidator: true };
    }
    else {
        matchingInput.setErrors(null);
        return null;
    }
};
//# sourceMappingURL=password-strength.validator.js.map