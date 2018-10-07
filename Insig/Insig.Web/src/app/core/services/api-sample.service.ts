import { Injectable } from "@angular/core";
import { SampleDto } from "@app/features/sample/sample.component";
import { Observable } from "rxjs";

import { ApiClientService } from "./api-client.service";


@Injectable({
  providedIn: "root"
})
export class ApiSampleService {
  constructor(private apiClientService: ApiClientService) {
  }

  getSampleData(): Observable<SampleDto[]> {
    return this.apiClientService.get("values/sample");
  }

  addSampleData(sample: SampleDto): Observable<SampleDto> {
    return this.apiClientService.post("values/sample", sample);
  }
}
