import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { UserManager } from 'oidc-client';
import { from, of, ReplaySubject } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthSettings } from './auth.config';
let AuthService = class AuthService {
    constructor(_http, _router) {
        this._http = _http;
        this._router = _router;
        this._identityUrl = appConfig.identityUrl;
        this._userManager = new UserManager(AuthSettings.getClientSettings());
        this._authStatusSource = new ReplaySubject();
        this.authStatus$ = this._authStatusSource.asObservable();
        this._userManager.getUser().then(user => {
            if (!!user && !user.expired) {
                this._user = user;
                this._authStatusSource.next(this.isAuthenticated());
            }
            else {
                this._userManager.signinSilent().then((userResult) => {
                    this._user = userResult;
                    this._authStatusSource.next(this.isAuthenticated());
                }).catch(() => {
                    this._authStatusSource.next(false);
                });
            }
        });
        this._userManager.events.addUserLoaded(user => {
            if (this._user !== user) {
                this._user = user;
            }
        });
        this._userManager.events.addUserSignedOut(() => {
            this._userManager.removeUser().then(() => {
                this._user = null;
                this._authStatusSource.next(false);
                this._router.navigate(['logout']);
            });
        });
    }
    get isAuthenticated$() {
        return from(this._userManager.getUser()).pipe(switchMap(user => (!!user && !user.expired
            ? of(true)
            : from(this._userManager.signinSilent()).pipe(map(userResult => {
                this._user = userResult;
                return !!userResult;
            })))), catchError(() => of(false)));
    }
    get name() {
        var _a;
        return (_a = this._user) === null || _a === void 0 ? void 0 : _a.profile.name;
    }
    register(credentials) {
        return this._http.post(`${this._identityUrl}/register`, credentials);
    }
    login() {
        return this._userManager.signinRedirect({ state: window.location.href });
    }
    manageAccount() {
        window.location.href = `${this._identityUrl}/Manage/Index?ReturnUrl=${encodeURIComponent(appConfig.clientUrl)}`;
    }
    isAuthenticated() {
        return !!this._user && !this._user.expired;
    }
    async completeAuthentication() {
        await this._userManager.signinRedirectCallback().then((user) => {
            this._user = user;
            this._router.navigate([(new URL(user.state)).searchParams.get('redirect') || '/']);
            this._authStatusSource.next(this.isAuthenticated());
        });
    }
    signout() {
        this._userManager.signoutRedirect();
    }
    getAuthorizationToken() {
        return this._userManager.getUser().then(user => {
            if (!!user && !user.expired) {
                return `${user.token_type} ${user.access_token}`;
            }
            else {
                return null;
            }
        });
    }
};
AuthService = __decorate([
    Injectable()
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map