import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User, UserManager } from "oidc-client";
import { from, Observable, of, ReplaySubject } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { AuthSettings } from "./auth.config";

interface RegisterCredentials {
    email: string;
    phoneNumber: string;
    password: string;
    redirectUrl: string;
}

@Injectable()
export class AuthService {
    authStatus$: Observable<boolean>;

    private _identityUrl = appConfig.identityUrl;
    private _userManager = new UserManager(AuthSettings.getClientSettings());
    private _user: Nullable<User>;
    private _authStatusSource = new ReplaySubject<boolean>();

    constructor(private _http: HttpClient, private _router: Router) {
        this.authStatus$ = this._authStatusSource.asObservable();

        this._userManager.getUser().then(user => {
            if (!!user && !user.expired) {
                this._user = user;
                this._authStatusSource.next(this.isAuthenticated());
            } else {
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
                this._router.navigate(["logout"]);
            });
        });
    }

    register(credentials: RegisterCredentials): Observable<any> {
        return this._http.post(`${this._identityUrl}/register`, credentials);
    }

    login(): Promise<any> {
        return this._userManager.signinRedirect({ state: window.location.href });
    }

    manageAccount(): void {
        window.location.href = `${this._identityUrl}/Manage/Index?ReturnUrl=${encodeURIComponent(appConfig.clientUrl)}`;
    }

    isAuthenticated(): boolean {
        return !!this._user && !this._user.expired;
    }

    get isAuthenticated$(): Observable<boolean> {
        return from(this._userManager.getUser()).pipe(
            switchMap(user => (!!user && !user.expired
                ? of(true)
                : from(this._userManager.signinSilent()).pipe(
                    map(userResult => {
                        this._user = userResult;
                        return !!userResult;
                    })
                ))),
            catchError(() => of(false))
        );
    }

    async completeAuthentication(): Promise<void> {
        await this._userManager.signinRedirectCallback().then((user) => {
            this._user = user;
            this._router.navigate([(new URL(user.state)).searchParams.get("redirect") || "/"]);
            this._authStatusSource.next(this.isAuthenticated());
        });
    }

    signout(): void {
        this._userManager.signoutRedirect();
    }

    getAuthorizationToken(): Promise<Nullable<string>> {
        return this._userManager.getUser().then(user => {
            if (!!user && !user.expired) {
                return `${user.token_type} ${user.access_token}`;
            } else {
                return null;
            }
        });
    }

    get name(): Nullable<string> {
        return this._user?.profile.name;
    }
}
