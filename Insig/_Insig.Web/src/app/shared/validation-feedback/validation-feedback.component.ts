import { Component, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';

interface MinLength {
    requiredLength: number;
}

@Component({
    selector: 'app-validation-feedback',
    templateUrl: './validation-feedback.component.html'
})
export class ValidationFeedbackComponent implements OnInit {
    @Input() control: Nullable<AbstractControl>;
    @Input() controlName: Nullable<string>;

    private _validatorErrors: { [key: string]: string };

    constructor(@Optional() private _formGroup: FormGroupDirective) { }

    getValidationError(): string {
        if (this.control) {
            this._validatorErrors = {
                required: 'Field is required.',
                minlength: `Field has to have at least ${(this.control.getError('minlength') as MinLength)?.requiredLength} characters.`,
                email: 'E-mail format is incorrect.'
            };

            return this._validatorErrors[Object.keys((this.control.errors as any))[0]];
        }

        return '';
    }

    ngOnInit(): void {
        if (!this.control && !this.controlName) {
            throw new Error('Validation Feedback must have [control] or [controlName] inputs');
        } else if (this.controlName && this._formGroup) {
            this.control = this._formGroup.form.get(this.controlName);
        }
    }
}
