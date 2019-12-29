import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { EMPTY, from, Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { AuthService } from "../auth/auth.service";

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith(appConfig.ApiUrl)) {
            return from(this.authService.getAuthorizationToken().then(token => {
                if (token) {
                    req = req.clone({ setHeaders: { Authorization: token } });
                }
                return next.handle(req).toPromise();
            })).pipe(
                catchError((err) => {
                    if (err instanceof HttpErrorResponse) {
                        switch ((<HttpErrorResponse>err).status) {
                            case 401:
                                return this.handle401Error(err);
                        }
                    }
                    return throwError(err);
                })
            );
        } else {
            return next.handle(req);
        }
    }

    private handle401Error(error: HttpErrorResponse): Observable<any> {
        this.router.navigateByUrl("login");
        return EMPTY;
    }
}
