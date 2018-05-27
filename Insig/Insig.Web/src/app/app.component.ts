import { Component } from "@angular/core";

import { ApiSampleService } from "./core/services/api-sample.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  title = "app";
  sample: Object;

  constructor(private sampleService: ApiSampleService) {
    sampleService.getSampleData().subscribe(data => {
      this.sample = data;
    });
  }
}
