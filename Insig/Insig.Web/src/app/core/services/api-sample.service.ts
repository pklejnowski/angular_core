import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ApiSampleService {
  constructor(private http: HttpClient) {
  }

  getSampleData() {
    const apiUrl = "http://localhost:5001/api/values";
    return this.http.get(apiUrl);
  }
}
