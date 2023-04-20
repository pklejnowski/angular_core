import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { HttpAuthInterceptor } from './interceptors/http-auth-interceptor';
import { ToastHttpInterceptor } from './interceptors/toast-http-interceptor';
let CoreModule = class CoreModule {
};
CoreModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            HttpClientModule,
            ToastrModule.forRoot()
        ],
        declarations: [],
        providers: [
            {
                provide: HTTP_INTERCEPTORS,
                useClass: ToastHttpInterceptor,
                multi: true
            },
            {
                provide: HTTP_INTERCEPTORS,
                useClass: HttpAuthInterceptor,
                multi: true
            }
        ]
    })
], CoreModule);
export { CoreModule };
//# sourceMappingURL=core.module.js.map