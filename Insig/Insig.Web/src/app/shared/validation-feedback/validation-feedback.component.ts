import { Component, Input, OnInit, Optional } from "@angular/core";
import { AbstractControl, FormGroupDirective } from "@angular/forms";

@Component({
  selector: "app-validation-feedback",
  templateUrl: "./validation-feedback.component.html",
  styleUrls: ["./validation-feedback.component.scss"]
})
export class ValidationFeedbackComponent implements OnInit {

  @Input() control: AbstractControl;
  @Input() controlName: string;

  constructor(@Optional() private formGroup: FormGroupDirective) { }

  ngOnInit(): void {
    if (!this.control && !this.controlName) {
      throw new Error("Validation Feedback must have [control] or [controlName] inputs");
    } else if (this.controlName && this.formGroup) {
      this.control = this.formGroup.form.get(this.controlName);
    }
  }
}
