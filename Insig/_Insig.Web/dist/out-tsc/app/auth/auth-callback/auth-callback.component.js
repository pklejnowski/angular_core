import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AuthCallbackComponent = class AuthCallbackComponent {
    constructor(_authService, _router) {
        this._authService = _authService;
        this._router = _router;
        this.error = false;
    }
    async ngOnInit() {
        if (this._router.url.indexOf('error') >= 0) {
            this.error = true;
            return;
        }
        await this._authService.completeAuthentication();
    }
};
AuthCallbackComponent = __decorate([
    Component({
        selector: 'app-auth-callback',
        templateUrl: './auth-callback.component.html',
        styleUrls: ['auth-callback.component.scss']
    })
], AuthCallbackComponent);
export { AuthCallbackComponent };
//# sourceMappingURL=auth-callback.component.js.map