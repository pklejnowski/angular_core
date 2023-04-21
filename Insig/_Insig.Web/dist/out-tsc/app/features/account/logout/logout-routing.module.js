import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './logout.component';
const routes = [{
        path: 'logout',
        component: LogoutComponent
    }];
let LogoutRoutingModule = class LogoutRoutingModule {
};
LogoutRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], LogoutRoutingModule);
export { LogoutRoutingModule };
//# sourceMappingURL=logout-routing.module.js.map