import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "@app/material.module";

import { ValidationFeedbackComponent } from "./validation-feedback/validation-feedback.component";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    ValidationFeedbackComponent
  ],
  exports: [
    ValidationFeedbackComponent
  ]
})
export class SharedModule { }
