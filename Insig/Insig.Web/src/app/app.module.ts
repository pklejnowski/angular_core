import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastHttpInterceptor } from "@app/core/interceptors/toast-http-interceptor";
import { LoadingBarHttpClientModule } from "@ngx-loading-bar/http-client";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing.module";
import { AuthCallbackComponent } from "./auth-callback/auth-callback.component";
import { CoreModule } from "./core/core.module";
import { HttpAuthInterceptor } from "./core/interceptors/http-auth-interceptor";
import { MainModule } from "./main/main.module";
import { MaterialModule } from "./material.module";

@NgModule({
  declarations: [
    AppComponent,
    AuthCallbackComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    CoreModule,
    MainModule,
    AppRoutingModule,
    LoadingBarHttpClientModule
  ],
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
