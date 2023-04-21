var AuthModule_1;
import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './auth.service';
let AuthModule = AuthModule_1 = class AuthModule {
    static forRoot() {
        return {
            ngModule: AuthModule_1,
            providers: [AuthService]
        };
    }
};
AuthModule = AuthModule_1 = __decorate([
    NgModule({
        declarations: [
            AuthCallbackComponent
        ],
        imports: [
            CommonModule,
            AuthRoutingModule,
            MatCardModule
        ]
    })
], AuthModule);
export { AuthModule };
//# sourceMappingURL=auth.module.js.map