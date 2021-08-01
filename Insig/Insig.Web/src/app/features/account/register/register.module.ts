import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "@app/material.module";
import { SharedModule } from "@app/shared/shared.module";

import { PasswordValidatorFeedbackComponent } from "./password-validator-feedback/password-validator-feedback.component";
import { RegisterRoutingModule } from "./register-routing.module";
import { RegisterComponent } from "./register.component";

@NgModule({
    imports: [
        CommonModule,
        RegisterRoutingModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule
    ],
    declarations: [
        RegisterComponent,
        PasswordValidatorFeedbackComponent
    ]
})
export class RegisterModule { }
