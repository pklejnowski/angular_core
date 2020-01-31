import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthModule } from "@app/auth";
import { LoadingBarHttpClientModule } from "@ngx-loading-bar/http-client";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing.module";
import { CoreModule } from "./core/core.module";
import { MainModule } from "./main/main.module";
import { MaterialModule } from "./material.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AuthModule.forRoot(),
        MaterialModule,
        BrowserAnimationsModule,
        CoreModule,
        MainModule,
        AppRoutingModule,
        LoadingBarHttpClientModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
