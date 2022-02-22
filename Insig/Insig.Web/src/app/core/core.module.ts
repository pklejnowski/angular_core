import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

import { HttpAuthInterceptor } from './interceptors/http-auth-interceptor';
import { ToastHttpInterceptor } from './interceptors/toast-http-interceptor';

@NgModule({
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
export class CoreModule { }
