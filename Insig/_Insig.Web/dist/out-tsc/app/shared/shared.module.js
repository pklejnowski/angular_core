import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@app/material.module';
import { PasswordSwitchTypeDirective } from './password-switch-type.directive';
import { ValidationFeedbackComponent } from './validation-feedback/validation-feedback.component';
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            MaterialModule
        ],
        declarations: [
            ValidationFeedbackComponent,
            PasswordSwitchTypeDirective
        ],
        exports: [
            ValidationFeedbackComponent,
            PasswordSwitchTypeDirective
        ]
    })
], SharedModule);
export { SharedModule };
//# sourceMappingURL=shared.module.js.map