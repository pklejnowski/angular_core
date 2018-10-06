import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ApiClientService {
  apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.apiUrl + url);
  }

  post<T>(url: string, data?: any): Observable<T> {
    return this.http.post<T>(this.apiUrl + url, data);
  }

  put<T>(url: string, data?: any): Observable<T> {
    return this.http.put<T>(this.apiUrl + url, data);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.apiUrl + url);
  }
}
