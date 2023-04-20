import { __decorate } from "tslib";
import { Component } from '@angular/core';
let LoginComponent = class LoginComponent {
    constructor(_authService) {
        this._authService = _authService;
    }
    login() {
        this._authService.login();
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map