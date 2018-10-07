import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "@app/material.module";
import { SharedModule } from "@app/shared/shared.module";

import { RegistrationRoutingModule } from "./registration-routing.module";
import { RegistrationComponent } from "./registration.component";

@NgModule({
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [RegistrationComponent]
})
export class RegistrationModule { }
