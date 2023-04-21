import { __awaiter, __decorate, __metadata } from "tslib";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@app/core/auth/auth.service";
let AuthCallbackComponent = class AuthCallbackComponent {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.router.url.indexOf("error") >= 0) {
                this.error = true;
                return;
            }
            yield this.authService.completeAuthentication();
        });
    }
};
AuthCallbackComponent = __decorate([
    Component({
        selector: "app-auth-callback",
        templateUrl: "./auth-callback.component.html",
        styleUrls: ["auth-callback.component.scss"]
    }),
    __metadata("design:paramtypes", [AuthService, Router])
], AuthCallbackComponent);
export { AuthCallbackComponent };
//# sourceMappingURL=auth-callback.component.js.map