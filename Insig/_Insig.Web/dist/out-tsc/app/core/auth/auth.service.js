import { __awaiter, __decorate, __metadata } from "tslib";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserManager } from "oidc-client";
import { from, of, ReplaySubject } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { getClientSettings } from "./auth.config";
let AuthService = class AuthService {
    constructor(http, router) {
        this.http = http;
        this.router = router;
        this.authorizationUrl = appConfig.AuthorizationUrl;
        this.userManager = new UserManager(getClientSettings());
        this.authStatusSource = new ReplaySubject();
        this.authStatus$ = this.authStatusSource.asObservable();
        this.userManager.getUser().then(user => {
            if (!!user && !user.expired) {
                this.user = user;
                this.authStatusSource.next(this.isAuthenticated());
            }
            else {
                this.userManager.signinSilent().then((userResult) => {
                    this.user = userResult;
                    this.authStatusSource.next(this.isAuthenticated());
                }).catch(() => {
                    this.authStatusSource.next(false);
                });
            }
        });
        this.userManager.events.addUserLoaded(user => {
            if (this.user !== user) {
                this.user = user;
            }
        });
        this.userManager.events.addUserSignedOut(() => {
            this.userManager.removeUser().then(() => {
                this.user = null;
                this.authStatusSource.next(false);
                this.router.navigate(["logout"]);
            });
        });
    }
    register(credentials) {
        return this.http.post(this.authorizationUrl + "/register", credentials);
    }
    login() {
        return this.userManager.signinRedirect({ state: window.location.href });
    }
    manageAccount() {
        window.location.href = this.authorizationUrl + "/Manage/Index?ReturnUrl=" + encodeURIComponent(appConfig.ClientUrl);
    }
    isAuthenticated() {
        return !!this.user && !this.user.expired;
    }
    get isAuthenticated$() {
        return from(this.userManager.getUser()).pipe(switchMap(user => !!user && !user.expired
            ? of(true)
            : from(this.userManager.signinSilent()).pipe(map(userResult => {
                this.user = userResult;
                return !!userResult;
            }))), catchError(() => of(false)));
    }
    completeAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userManager.signinRedirectCallback().then((user) => {
                this.user = user;
                this.router.navigate([(new URL(user.state)).searchParams.get("redirect") || "/"]);
                this.authStatusSource.next(this.isAuthenticated());
            });
        });
    }
    signout() {
        this.userManager.signoutRedirect();
    }
    getAuthorizationToken() {
        return this.userManager.getUser().then(user => {
            if (!!user && !user.expired) {
                return `${user.token_type} ${this.user.access_token}`;
            }
            else {
                return null;
            }
        });
    }
    get name() {
        return this.user != null ? this.user.profile.name : "";
    }
};
AuthService = __decorate([
    Injectable({
        providedIn: "root"
    }),
    __metadata("design:paramtypes", [HttpClient, Router])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map