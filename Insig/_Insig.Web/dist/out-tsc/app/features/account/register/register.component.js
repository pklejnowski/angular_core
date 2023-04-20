import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { PasswordValidator } from './password-strength.validator';
let RegisterComponent = class RegisterComponent {
    constructor(_fb, _authService, _toastr, _router) {
        this._fb = _fb;
        this._authService = _authService;
        this._toastr = _toastr;
        this._router = _router;
        this.registerForm = this._fb.group({
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: ['', [Validators.required, Validators.minLength(6)]],
            password: ['', [PasswordValidator.strength]],
            confirmPassword: ['', [Validators.required]]
        }, {
            validators: PasswordValidator.confirmed('password', 'confirmPassword')
        });
    }
    register() {
        if (this.registerForm.valid) {
            this._authService.register({
                email: this.registerForm.value.email,
                phoneNumber: `+48${this.registerForm.value.phoneNumber}`,
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
};
RegisterComponent = __decorate([
    Component({
        selector: 'app-register',
        templateUrl: './register.component.html'
    })
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map