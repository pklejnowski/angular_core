import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "environments/environment";
import { User, UserManager } from "oidc-client";
import { BehaviorSubject, from, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { getClientSettings } from "./auth.config";

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {

  private authorizationUrl = environment.authorizationUrl;
  private manager = new UserManager(getClientSettings());
  private user: User | null;

  private authNavStatusSource = new BehaviorSubject<boolean>(false);
  authStatus$ = this.authNavStatusSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.manager.getUser().then(user => {
      this.user = user;
      this.authNavStatusSource.next(this.isAuthenticated());
    });

    this.manager.events.addUserLoaded(user => {
      this.user = user;
    });

    this.manager.events.addUserSignedOut(() => {
      this.user = null;
      this.authNavStatusSource.next(this.isAuthenticated());
      this.router.navigate(["logout"]);
    });
  }

  register(credentials: RegisterCredentials): Observable<any> {
    return this.http.post(this.authorizationUrl + "register", credentials);
  }

  login(): Promise<any> {
    return this.manager.signinRedirect({ state: window.location.href });
  }

  isAuthenticated(): boolean {
    return this.user != null && !this.user.expired;
  }

  isAuthenticatedObs(): Observable<boolean> {
    return from(this.manager.getUser()).pipe(map(user => !!user));
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
