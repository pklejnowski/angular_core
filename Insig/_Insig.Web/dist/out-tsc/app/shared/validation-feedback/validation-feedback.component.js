import { __decorate, __param } from "tslib";
import { Component, Input, Optional } from '@angular/core';
let ValidationFeedbackComponent = class ValidationFeedbackComponent {
    constructor(_formGroup) {
        this._formGroup = _formGroup;
    }
    getValidationError() {
        var _a;
        if (this.control) {
            this._validatorErrors = {
                required: 'Field is required.',
                minlength: `Field has to have at least ${(_a = this.control.getError('minlength')) === null || _a === void 0 ? void 0 : _a.requiredLength} characters.`,
                email: 'E-mail format is incorrect.'
            };
            return this._validatorErrors[Object.keys(this.control.errors)[0]];
        }
        return '';
    }
    ngOnInit() {
        if (!this.control && !this.controlName) {
            throw new Error('Validation Feedback must have [control] or [controlName] inputs');
        }
        else if (this.controlName && this._formGroup) {
            this.control = this._formGroup.form.get(this.controlName);
        }
    }
};
__decorate([
    Input()
], ValidationFeedbackComponent.prototype, "control", void 0);
__decorate([
    Input()
], ValidationFeedbackComponent.prototype, "controlName", void 0);
ValidationFeedbackComponent = __decorate([
    Component({
        selector: 'app-validation-feedback',
        templateUrl: './validation-feedback.component.html'
    }),
    __param(0, Optional())
], ValidationFeedbackComponent);
export { ValidationFeedbackComponent };
//# sourceMappingURL=validation-feedback.component.js.map