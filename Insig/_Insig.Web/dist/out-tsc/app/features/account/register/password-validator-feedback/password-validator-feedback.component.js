import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let PasswordValidatorFeedbackComponent = class PasswordValidatorFeedbackComponent {
    constructor(_formGroup) {
        this._formGroup = _formGroup;
    }
    getValidationError() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if ((_a = this._control) === null || _a === void 0 ? void 0 : _a.hasError('required')) {
            return 'Field is required.';
        }
        else if ((_b = this._control) === null || _b === void 0 ? void 0 : _b.hasError('upperCaseCharacters')) {
            return 'Password must contains an uppercase character.';
        }
        else if ((_c = this._control) === null || _c === void 0 ? void 0 : _c.hasError('lowerCaseCharacters')) {
            return 'Password must contains a lowercase character.';
        }
        else if ((_d = this._control) === null || _d === void 0 ? void 0 : _d.hasError('numberCharacters')) {
            return 'Password must contains a number.';
        }
        else if ((_e = this._control) === null || _e === void 0 ? void 0 : _e.hasError('specialCharacters')) {
            return 'Password must contains a special character.';
        }
        else if ((_f = this._control) === null || _f === void 0 ? void 0 : _f.hasError('minlength')) {
            return `Password must contains at least ${((_g = this._control) === null || _g === void 0 ? void 0 : _g.getError('minlength')).requiredLength} characters.`;
        }
        else if ((_h = this._control) === null || _h === void 0 ? void 0 : _h.hasError('confirmedValidator')) {
            return 'This doesn\'t match the password you\'ve provided.';
        }
        return '';
    }
    ngOnInit() {
        this._control = this._formGroup.form.get(this.controlName);
    }
};
__decorate([
    Input()
], PasswordValidatorFeedbackComponent.prototype, "controlName", void 0);
PasswordValidatorFeedbackComponent = __decorate([
    Component({
        selector: 'app-password-validator-feedback',
        templateUrl: './password-validator-feedback.component.html'
    })
], PasswordValidatorFeedbackComponent);
export { PasswordValidatorFeedbackComponent };
//# sourceMappingURL=password-validator-feedback.component.js.map