import { Component, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, ValidatorFn, Validators } from "@angular/forms";
import { AuthService } from "@app/core/auth/auth.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"]
})
export class RegistrationComponent implements OnDestroy {

  destroySubject$: Subject<void> = new Subject();

  registrationForm = this.fb.group({
    username: ["", [Validators.required]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    confirmPassword: ["", [Validators.required, this.passwordValidator("password")]]
  });

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  register(): void {
    if (this.registrationForm.valid) {
      this.authService.register(this.registrationForm.value);
    }
  }

  passwordValidator(confirmPasswordInput: string): ValidatorFn {
    let confirmPasswordControl: FormControl;
    let passwordControl: FormControl;

    return (control: FormControl) => {
      if (!control.parent) {
        return null;
      }

      if (!confirmPasswordControl) {
        confirmPasswordControl = control;
        passwordControl = control.parent.get(confirmPasswordInput) as FormControl;
        passwordControl.valueChanges.pipe(
          takeUntil(this.destroySubject$)
        ).subscribe(() => {
          confirmPasswordControl.updateValueAndValidity();
        });
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        return {
          notMatch: true
        };
      }

      return null;
    };
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
  }
}
