import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MaterialModule } from "../material.module";
import { FeaturesRoutingModule } from "./features-routing.module";
import { SampleComponent } from "./sample/sample.component";

@NgModule({
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    MaterialModule
  ],
  declarations: [
    SampleComponent
  ],
  exports: [
    SampleComponent
  ]
})
export class FeaturesModule { }
