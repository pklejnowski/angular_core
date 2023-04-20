import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
let ToastHttpInterceptor = class ToastHttpInterceptor {
    constructor(_toastr) {
        this._toastr = _toastr;
    }
    intercept(req, next) {
        return next.handle(req).pipe(catchError((err) => {
            this._toastr.error('Operation failed', 'Error');
            return throwError(err);
        }));
    }
};
ToastHttpInterceptor = __decorate([
    Injectable()
], ToastHttpInterceptor);
export { ToastHttpInterceptor };
//# sourceMappingURL=toast-http-interceptor.js.map