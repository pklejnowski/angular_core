import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "@app/material.module";
import { SharedModule } from "@app/shared/shared.module";

import { LogoutRoutingModule } from "./logout-routing.module";
import { LogoutComponent } from "./logout.component";

@NgModule({
    imports: [
        CommonModule,
        LogoutRoutingModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule
    ],
    declarations: [LogoutComponent]
})
export class LogoutModule { }
