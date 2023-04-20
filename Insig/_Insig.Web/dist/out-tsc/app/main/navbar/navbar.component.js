import { __decorate } from "tslib";
import { Component } from '@angular/core';
let NavbarComponent = class NavbarComponent {
    constructor(_authService) {
        this._authService = _authService;
        this.title = 'Sample App';
    }
    signout() {
        this._authService.signout();
    }
    manageAccount() {
        this._authService.manageAccount();
    }
    ngOnInit() {
        this.authStatus$ = this._authService.authStatus$;
    }
    getUserName() {
        return this._authService.name;
    }
};
NavbarComponent = __decorate([
    Component({
        selector: 'app-navbar',
        templateUrl: './navbar.component.html',
        styleUrls: ['./navbar.component.scss']
    })
], NavbarComponent);
export { NavbarComponent };
//# sourceMappingURL=navbar.component.js.map