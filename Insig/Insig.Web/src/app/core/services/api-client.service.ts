import "urijs/src/URITemplate";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as URI from "urijs";

@Injectable({
    providedIn: "root"
})
export class ApiClientService {
    constructor(private readonly http: HttpClient) { }

    get<T>(
        uriTemplate: string,
        segmentParams?: { [segmentParam: string]: any | any[] },
        queryParams?: { [queryParam: string]: any | any[] }): Observable<T> {

        const url: string = this.buildUrl(uriTemplate, segmentParams, queryParams);
        return this.http.get<T>(url);
    }

    getBlob(
        uriTemplate: string,
        segmentParams?: { [segmentParam: string]: any | any[] },
        queryParams?: { [queryParam: string]: any | any[] }): Observable<Blob> {

        const url: string = this.buildUrl(uriTemplate, segmentParams, queryParams);
        return this.http.get(url, { responseType: "blob" });
    }

    post<T>(
        uriTemplate: string,
        segmentParams?: { [segmentParam: string]: any | any[] },
        data?: any): Observable<T> {

        const queryParams: string = null;
        const url: string = this.buildUrl(uriTemplate, segmentParams, queryParams);
        return this.http.post<T>(url, data);
    }

    postBlob(
        uriTemplate: string,
        segmentParams?: { [segmentParam: string]: any | any[] },
        data?: any): Observable<Blob> {

        const queryParams: string = null;
        const url: string = this.buildUrl(uriTemplate, segmentParams, queryParams);
        return this.http.post(url, data, { responseType: "blob" });
    }

    put<T>(
        uriTemplate: string,
        segmentParams?: { [segmentParam: string]: any | any[] },
        data?: any): Observable<T> {

        const queryParams: string = null;
        const url: string = this.buildUrl(uriTemplate, segmentParams, queryParams);
        return this.http.put<T>(url, data);
    }

    delete<T>(
        uriTemplate: string,
        segmentParams?: { [segmentParam: string]: any | any[] }): Observable<T> {

        const url: string = this.buildUrl(uriTemplate, segmentParams);
        return this.http.delete<T>(url);
    }

    private buildUrl(
        uriTemplate: string,
        segmentParams?: { [segmentParam: string]: any | any[] },
        queryParams?: any): string {

        let uri: uri.URI = null;

        if (segmentParams) {
            uri = URI.expand(uriTemplate, segmentParams);
        }

        if (uri === null) {
            uri = URI(uriTemplate);
        }

        if (queryParams) {
            uri = uri.query(queryParams);
        }

        return uri.toString();
    }
}
