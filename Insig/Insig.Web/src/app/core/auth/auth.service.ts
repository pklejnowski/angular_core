import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "environments/environment";
import { User, UserManager } from "oidc-client";
import { from, Observable, of, ReplaySubject } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { getClientSettings } from "./auth.config";

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  redirectUrl: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {

  private authorizationUrl = environment.authorizationUrl;
  private manager = new UserManager(getClientSettings());
  private user: User | null;

  private authNavStatusSource = new ReplaySubject<boolean>();
  authStatus$ = this.authNavStatusSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.manager.getUser().then(user => {
      if (user) {
        this.user = user;
        this.authNavStatusSource.next(this.isAuthenticated());
      } else {
        this.manager.signinSilent().then((userResult: User) => {
          this.user = userResult;
          this.authNavStatusSource.next(this.isAuthenticated());
        }).catch(() => {
          this.authNavStatusSource.next(false);
        });
      }
    });

    this.manager.events.addUserLoaded(user => {
      this.user = user;
    });

    this.manager.events.addUserSignedOut(() => {
      this.manager.removeUser().then(() => {
        this.user = null;
        this.authNavStatusSource.next(false);
        this.router.navigate(["logout"]);
      });
    });
  }

  register(credentials: RegisterCredentials): Observable<any> {
    return this.http.post(this.authorizationUrl + "register", credentials);
  }

  login(): Promise<any> {
    return this.manager.signinRedirect({ state: window.location.href });
  }

  manageAccount(): void {
    window.location.href = this.authorizationUrl + "Manage/Index?ReturnUrl=" + encodeURIComponent(environment.clientUrl);
  }

  isAuthenticated(): boolean {
    return this.user != null && !this.user.expired;
  }

  get isAuthenticated$(): Observable<boolean> {
    return from(this.manager.getUser()).pipe(
      switchMap(user => !!user
        ? of(true)
        : from(this.manager.signinSilent()).pipe(
          map(userResult => {
            this.user = userResult;
            return !!userResult;
          }))),
      catchError(() => of(false))
    );
  }

  async completeAuthentication(): Promise<void> {
    await this.manager.signinRedirectCallback().then((user) => {
      this.user = user;
      this.router.navigate([(new URL(user.state)).searchParams.get("redirect") || "/"]);
    });

    this.authNavStatusSource.next(this.isAuthenticated());
  }

  signout(): void {
    this.manager.signoutRedirect();
  }

  get name(): string {
    return this.user != null ? this.user.profile.name : "";
  }

  get authorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }
}
