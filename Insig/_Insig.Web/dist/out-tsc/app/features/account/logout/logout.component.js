import { __decorate } from "tslib";
import { Component } from '@angular/core';
let LogoutComponent = class LogoutComponent {
    constructor(_authService, _router) {
        this._authService = _authService;
        this._router = _router;
    }
    ngOnInit() {
        if (this._authService.isAuthenticated()) {
            this._router.navigate(['/']);
        }
    }
};
LogoutComponent = __decorate([
    Component({
        selector: 'app-logout',
        templateUrl: './logout.component.html',
        styleUrls: ['./logout.component.scss']
    })
], LogoutComponent);
export { LogoutComponent };
//# sourceMappingURL=logout.component.js.map