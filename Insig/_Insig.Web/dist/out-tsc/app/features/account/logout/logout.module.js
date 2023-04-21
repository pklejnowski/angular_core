import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { LogoutRoutingModule } from './logout-routing.module';
import { LogoutComponent } from './logout.component';
let LogoutModule = class LogoutModule {
};
LogoutModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            LogoutRoutingModule,
            ReactiveFormsModule,
            MaterialModule,
            SharedModule
        ],
        declarations: [LogoutComponent]
    })
], LogoutModule);
export { LogoutModule };
//# sourceMappingURL=logout.module.js.map