import { Component, OnInit } from "@angular/core";
import { ApiSampleService } from "@app/core/services/api-sample.service";
import { Observable } from "rxjs";
import { switchMapTo } from "rxjs/operators";

export interface SampleDto {
    name: string;
}

@Component({
    selector: "app-sample",
    templateUrl: "./sample.component.html"
})
export class SampleComponent implements OnInit {
    title = "Sample App";
    samples!: Observable<SampleDto[]>;

    constructor(private _sampleService: ApiSampleService) { }

    addSample(sampleName: string): void {
        this.samples = this._sampleService.addSampleData({ name: sampleName } as SampleDto)
            .pipe(
                switchMapTo(this._sampleService.getSampleData())
            );
    }

    ngOnInit(): void {
        this.samples = this._sampleService.getSampleData();
    }
}
