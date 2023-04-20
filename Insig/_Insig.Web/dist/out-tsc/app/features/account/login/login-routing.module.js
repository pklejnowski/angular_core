import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
const routes = [{
        path: 'login',
        component: LoginComponent
    }];
let LoginRoutingModule = class LoginRoutingModule {
};
LoginRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], LoginRoutingModule);
export { LoginRoutingModule };
//# sourceMappingURL=login-routing.module.js.map