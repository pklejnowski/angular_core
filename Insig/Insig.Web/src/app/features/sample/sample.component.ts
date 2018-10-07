import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { switchMapTo } from "rxjs/operators";
import { ApiSampleService } from "src/app/core/services/api-sample.service";

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
        switchMapTo(this.sampleService.getSampleData())
      );
  }

  ngOnInit(): void {
    this.samples = this.sampleService.getSampleData();
  }
}
