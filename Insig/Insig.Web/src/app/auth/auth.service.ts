import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User, UserManager } from "oidc-client";
import { from, Observable, of, ReplaySubject } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { getClientSettings } from "./auth.config";

interface RegisterCredentials {
    email: string;
    phoneNumber: string;
    password: string;
    redirectUrl: string;
}

@Injectable()
export class AuthService {

    private authorizationUrl = appConfig.AuthorizationUrl;
    private userManager = new UserManager(getClientSettings());
    private user: Nullable<User>;

    private authStatusSource = new ReplaySubject<boolean>();
    authStatus$ = this.authStatusSource.asObservable();

    constructor(private http: HttpClient, private router: Router) {
        this.userManager.getUser().then(user => {
            if (!!user && !user.expired) {
                this.user = user;
                this.authStatusSource.next(this.isAuthenticated());
            } else {
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

    register(credentials: RegisterCredentials): Observable<any> {
        return this.http.post(this.authorizationUrl + "/register", credentials);
    }

    login(): Promise<any> {
        return this.userManager.signinRedirect({ state: window.location.href });
    }

    manageAccount(): void {
        window.location.href = this.authorizationUrl + "/Manage/Index?ReturnUrl=" + encodeURIComponent(appConfig.ClientUrl);
    }

    isAuthenticated(): boolean {
        return !!this.user && !this.user.expired;
    }

    get isAuthenticated$(): Observable<boolean> {
        return from(this.userManager.getUser()).pipe(
            switchMap(user => !!user && !user.expired
                ? of(true)
                : from(this.userManager.signinSilent()).pipe(
                    map(userResult => {
                        this.user = userResult;
                        return !!userResult;
                    }))),
            catchError(() => of(false))
        );
    }

    async completeAuthentication(): Promise<void> {
        await this.userManager.signinRedirectCallback().then((user) => {
            this.user = user;
            this.router.navigate([(new URL(user.state)).searchParams.get("redirect") || "/"]);
            this.authStatusSource.next(this.isAuthenticated());
        });
    }

    signout(): void {
        this.userManager.signoutRedirect();
    }

    getAuthorizationToken(): Promise<Nullable<string>> {
        return this.userManager.getUser().then(user => {
            if (!!user && !user.expired) {
                return `${user.token_type} ${user.access_token}`;
            } else {
                return null;
            }
        });
    }

    get name(): Nullable<string> {
        return this.user?.profile.name;
    }
}
