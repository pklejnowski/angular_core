import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, from, lastValueFrom, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as URLParse from 'url-parse';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
    allowedUrls = [AppConfig.ClientUrl, AppConfig.ApiUrl, AppConfig.IdentityUrl];

    constructor(private _authService: AuthService, private _router: Router, private _toastrService: ToastrService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.checkUrl(req.url.toLowerCase())) {
            return next.handle(req);
        }

        return from(this._authService.getAuthorizationToken().then(token => {
            const newReq = token ? req.clone({ setHeaders: { authorization: token } }) : req;
            return lastValueFrom(next.handle(newReq));
        })).pipe(
            catchError((err) => {
                if (err instanceof HttpErrorResponse) {
                    switch (err.status) {
                        case 401:
                            return this.handle401Error(err);
                        case 404:
                            return this.handle404Error(err);
                        default:
                            return this.handle500Error(err);
                    }
                }
                return throwError(() => err as unknown);
            })
        );
    }

    // Handlers for http status codes
    private handle401Error(_: HttpErrorResponse): Observable<HttpEvent<any>> {
        this._router.navigateByUrl('login');
        return EMPTY;
    }

    private handle404Error(_: HttpErrorResponse): Observable<HttpEvent<any>> {
        this._router.navigateByUrl('not-found');
        return EMPTY;
    }

    private handle500Error(error: HttpErrorResponse): Observable<HttpEvent<any>> {
        this._toastrService.error(error.error?.detail || 'Operation failed', 'Error');
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
