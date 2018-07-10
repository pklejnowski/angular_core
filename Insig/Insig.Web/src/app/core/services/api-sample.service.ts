import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { SampleDto } from "../../app.component";

@Injectable({
  providedIn: "root"
})
export class ApiSampleService {
  constructor(private http: HttpClient) {
  }

  getSampleData(): Observable<SampleDto[]> {
    const apiUrl = "https://localhost:5001/values/sample";
    return this.http.get<SampleDto[]>(apiUrl);
  }

  addSampleData(sample: SampleDto): Observable<SampleDto> {
    const apiUrl = "https://localhost:5001/values/sample";
    return this.http.post<SampleDto>(apiUrl, sample);
  }
}
