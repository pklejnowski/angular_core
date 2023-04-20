import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
const routes = [
    {
        path: 'register',
        component: RegisterComponent
    }
];
let RegisterRoutingModule = class RegisterRoutingModule {
};
RegisterRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], RegisterRoutingModule);
export { RegisterRoutingModule };
//# sourceMappingURL=register-routing.module.js.map