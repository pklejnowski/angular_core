import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { EMPTY, Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { AuthService } from "../auth/auth.service";

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.authService.isAuthenticated()) {
            req = this.addToken(req);
        }

        return next.handle(req).pipe(
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
    }

    private addToken(req: HttpRequest<any>): HttpRequest<any> {
        const token = this.authService.authorizationHeaderValue;
        if (token) {
            req = req.clone({ setHeaders: { Authorization: token } });
        }

        return req;
    }

    private handle401Error(error: HttpErrorResponse): Observable<any> {
        this.router.navigateByUrl("login");
        return EMPTY;
    }
}
