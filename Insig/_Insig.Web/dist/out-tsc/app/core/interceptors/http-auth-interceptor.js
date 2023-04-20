import { __decorate } from "tslib";
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, from, lastValueFrom, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as URLParse from 'url-parse';
let HttpAuthInterceptor = class HttpAuthInterceptor {
    constructor(_authService, _router, _toastrService) {
        this._authService = _authService;
        this._router = _router;
        this._toastrService = _toastrService;
        this.allowedUrls = [appConfig.clientUrl, appConfig.apiUrl, appConfig.identityUrl];
    }
    intercept(req, next) {
        if (!this.checkUrl(req.url.toLowerCase())) {
            return next.handle(req);
        }
        return from(this._authService.getAuthorizationToken().then(token => {
            const newReq = token ? req.clone({ setHeaders: { authorization: token } }) : req;
            return lastValueFrom(next.handle(newReq));
        })).pipe(catchError((err) => {
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
            return throwError(() => err);
        }));
    }
    // Handlers for http status codes
    handle401Error(_) {
        this._router.navigateByUrl('login');
        return EMPTY;
    }
    handle404Error(_) {
        this._router.navigateByUrl('not-found');
        return EMPTY;
    }
    handle500Error(error) {
        var _a;
        this._toastrService.error(((_a = error.error) === null || _a === void 0 ? void 0 : _a.detail) || 'Operation failed', 'Error');
        return EMPTY;
    }
    // Helper methods
    checkUrl(callUrl) {
        return this.allowedUrls.some(url => this.isFromService(url, callUrl));
    }
    isFromService(url, callUrl) {
        if (!callUrl.startsWith(url)) {
            return false;
        }
        const serviceUrlBase = new URLParse(url);
        const callUrlBase = new URLParse(callUrl);
        return serviceUrlBase.hostname === callUrlBase.hostname
            && serviceUrlBase.protocol === callUrlBase.protocol;
    }
};
HttpAuthInterceptor = __decorate([
    Injectable()
], HttpAuthInterceptor);
export { HttpAuthInterceptor };
//# sourceMappingURL=http-auth-interceptor.js.map