import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "@app/material.module";

import { FeaturesRoutingModule } from "./features-routing.module";
import { LoginModule } from "./login/login.module";
import { RegistrationModule } from "./registration/registration.module";
import { SampleComponent } from "./sample/sample.component";

@NgModule({
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    MaterialModule,
    LoginModule,
    RegistrationModule
  ],
  declarations: [
    SampleComponent
  ],
  exports: [
    SampleComponent
  ]
})
export class FeaturesModule { }
