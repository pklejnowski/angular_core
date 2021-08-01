import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@app/auth";
import { EMPTY, from, Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import * as URLParse from "url-parse";

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

    allowedUrls = [appConfig.clientUrl, appConfig.apiUrl, appConfig.identityUrl];

    constructor(private authService: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!this.checkUrl(req.url.toLowerCase())) {
            return next.handle(req);
        }

        return from(this.authService.getAuthorizationToken().then(token => {
            if (token) {
                req = req.clone({ setHeaders: { Authorization: token } });
            }
            return next.handle(req).toPromise();
        })).pipe(
            catchError((err) => {
                if (err instanceof HttpErrorResponse) {
                    switch ((err as HttpErrorResponse).status) {
                        case 401:
                            return this.handle401Error(err);
                        case 404:
                            return this.handle404Error(err);
                    }
                }
                return throwError(err);
            })
        );
    }

    // Handlers for http status codes
    private handle401Error(error: HttpErrorResponse): Observable<any> {
        this.router.navigateByUrl("login");
        return EMPTY;
    }

    private handle404Error(error: HttpErrorResponse): Observable<any> {
        this.router.navigateByUrl("not-found");
        return EMPTY;
    }

    // Helper methods
    private checkUrl(callUrl: string): boolean {
        return this.allowedUrls.some(url => this.isFromService(url, callUrl));
    }

    private isFromService(url: string, callUrl: string): boolean {
        if (!callUrl.startsWith(url)) {
            return false;
        }

        const serviceUrlBase = new URLParse(url);
        const callUrlBase = new URLParse(callUrl);

        return serviceUrlBase.hostname === callUrlBase.hostname
            && serviceUrlBase.protocol === callUrlBase.protocol;
    }
}
