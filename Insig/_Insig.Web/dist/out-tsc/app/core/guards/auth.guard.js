import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs/operators';
let AuthGuard = class AuthGuard {
    constructor(_router, _authService) {
        this._router = _router;
        this._authService = _authService;
    }
    canActivate(route, state) {
        return this._authService.isAuthenticated$.pipe(take(1), tap(isAuthenticated => {
            if (!isAuthenticated) {
                this._router.navigate(['login'], { queryParams: { redirect: state.url }, replaceUrl: true });
            }
        }));
    }
};
AuthGuard = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map