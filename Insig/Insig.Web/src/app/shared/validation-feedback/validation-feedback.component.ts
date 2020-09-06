import { Component, Input, OnInit, Optional } from "@angular/core";
import { AbstractControl, FormGroupDirective } from "@angular/forms";

@Component({
    selector: "app-validation-feedback",
    templateUrl: "./validation-feedback.component.html"
})
export class ValidationFeedbackComponent implements OnInit {

    @Input() control: Nullable<AbstractControl>;
    @Input() controlName: Nullable<string>;

    constructor(@Optional() private formGroup: FormGroupDirective) { }

    getValidationError(): string {
        if (this.control?.hasError("required")) {
            return "Field is required.";
        } else if (this.control?.hasError("minlength")) {
            return `Field has to have at least ${this.control.getError("minlength").requiredLength} characters.`;
        } else if (this.control?.hasError("email")) {
            return "E-mail format is incorrect.";
        }
        return "";
    }

    ngOnInit(): void {
        if (!this.control && !this.controlName) {
            throw new Error("Validation Feedback must have [control] or [controlName] inputs");
        } else if (this.controlName && this.formGroup) {
            this.control = this.formGroup.form.get(this.controlName);
        }
    }
}
