import { Component } from "@angular/core";
import { Observable } from "rxjs";

import { ApiSampleService } from "./core/services/api-sample.service";

export interface SampleDto {
  id: number;
  name: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  title = "app";
  sample: Observable<SampleDto>;

  constructor(private sampleService: ApiSampleService) {
    this.sample = this.sampleService.getSampleData();
  }
}
