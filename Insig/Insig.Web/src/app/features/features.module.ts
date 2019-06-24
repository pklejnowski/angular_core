import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "@app/material.module";

import { FeaturesRoutingModule } from "./features-routing.module";
import { LoginModule } from "./login/login.module";
import { RegisterModule as RegisterModule } from "./register/register.module";
import { SampleComponent } from "./sample/sample.component";

@NgModule({
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    MaterialModule,
    LoginModule,
    RegisterModule
  ],
  declarations: [
    SampleComponent
  ],
  exports: [
    SampleComponent
  ]
})
export class FeaturesModule { }
