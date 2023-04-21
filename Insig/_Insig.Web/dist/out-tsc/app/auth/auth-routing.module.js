import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
const routes = [
    {
        path: 'auth-callback',
        component: AuthCallbackComponent
    }
];
let AuthRoutingModule = class AuthRoutingModule {
};
AuthRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], AuthRoutingModule);
export { AuthRoutingModule };
//# sourceMappingURL=auth-routing.module.js.map