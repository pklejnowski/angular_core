import { Component, OnInit } from "@angular/core";
import { ApiSampleService } from "@app/core/services/api-sample.service";
import { Observable } from "rxjs";
import { switchMapTo } from "rxjs/operators";

export interface SampleDto {
  name: string;
}

@Component({
  selector: "app-sample",
  templateUrl: "./sample.component.html",
})
export class SampleComponent implements OnInit {

  title = "Sample App";
  samples: Observable<SampleDto[]>;

  constructor(private sampleService: ApiSampleService) { }

  addSample(sampleName: string): void {
    this.samples = this.sampleService.addSampleData(<SampleDto>{ name: sampleName })
      .pipe(
        // delay(2000),
        switchMapTo(this.sampleService.getSampleData())
      );
  }

  ngOnInit(): void {
    this.samples = this.sampleService.getSampleData();
  }
}
