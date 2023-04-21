import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth';
import { ToastrService } from 'ngx-toastr';

import { PasswordValidator } from './password-strength.validator';

interface RegisterForm {
    email: Nullable<string>;
    phoneNumber: Nullable<string>;
    password: Nullable<string>;
    confirmPassword: Nullable<string>;
}

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    registerForm: FormGroup<ControlsOf<RegisterForm>> = this._fb.group<ControlsOf<RegisterForm>>({
        email: this._fb.control('', [Validators.required, Validators.email]),
        phoneNumber: this._fb.control('', [Validators.required, Validators.minLength(6)]),
        password: this._fb.control('', PasswordValidator.strength),
        confirmPassword: this._fb.control('', Validators.required),
    }, {
        validators: PasswordValidator.confirmed('password', 'confirmPassword')
    });

    constructor(private _fb: FormBuilder, private _authService: AuthService, private _toastr: ToastrService, private _router: Router) { }

    register(): void {
        if (this.registerForm.valid) {
            this._authService.register({
                email: this.registerForm.value.email!,
                phoneNumber: `+48${this.registerForm.value.phoneNumber as string}`,
                password: this.registerForm.value.password!,
                redirectUrl: `${AppConfig.ClientUrl}/login`
            }).subscribe({
                next: _ => {
                    this._toastr.success('A verification link has been sent to your email account', 'Thank you for registering');
                    this._router.navigate(['login']);
                },
                error: error => {
                    this._toastr.error(error.error[0].description);
                }
            });
        }
    }
}
