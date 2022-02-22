import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth';
import { ToastrService } from 'ngx-toastr';

import { PasswordValidator } from './password-strength.validator';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    registerForm = this._fb.group({
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.minLength(6)]],
        password: ['', [PasswordValidator.strength]],
        confirmPassword: ['', [Validators.required]]
    }, {
        validators: PasswordValidator.confirmed('password', 'confirmPassword')
    });

    constructor(private _fb: FormBuilder, private _authService: AuthService, private _toastr: ToastrService, private _router: Router) { }

    register(): void {
        if (this.registerForm.valid) {
            this._authService.register({
                email: this.registerForm.value.email,
                phoneNumber: `+48${this.registerForm.value.phoneNumber as string}`,
                password: this.registerForm.value.password,
                redirectUrl: `${appConfig.clientUrl}/login`
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
