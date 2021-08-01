import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormGroupDirective } from "@angular/forms";

interface MinLength {
    requiredLength: number;
}

@Component({
    selector: "app-password-validator-feedback",
    templateUrl: "./password-validator-feedback.component.html"
})
export class PasswordValidatorFeedbackComponent implements OnInit {
    @Input() controlName: string;
    private _control: Nullable<AbstractControl>;

    constructor(private _formGroup: FormGroupDirective) { }

    getValidationError(): string {
        if (this._control?.hasError("required")) {
            return "Field is required.";
        } else if (this._control?.hasError("upperCaseCharacters")) {
            return "Password must contains an uppercase character.";
        } else if (this._control?.hasError("lowerCaseCharacters")) {
            return "Password must contains a lowercase character.";
        } else if (this._control?.hasError("numberCharacters")) {
            return "Password must contains a number.";
        } else if (this._control?.hasError("specialCharacters")) {
            return "Password must contains a special character.";
        } else if (this._control?.hasError("minlength")) {
            return `Password must contains at least ${(this._control?.getError("minlength") as MinLength).requiredLength} characters.`;
        } else if (this._control?.hasError("confirmedValidator")) {
            return "This doesn't match the password you've provided.";
        }

        return "";
    }

    ngOnInit(): void {
        this._control = this._formGroup.form.get(this.controlName);
    }
}
