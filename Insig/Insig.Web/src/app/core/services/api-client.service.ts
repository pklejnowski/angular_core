import "urijs/src/URITemplate";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as URI from "urijs";

interface DataParam { [param: string]: any; }
interface DataBody { [param: string]: any; }

interface QueryParameters {
    segmentParams?: DataParam;
    queryParams?: DataParam;
}

interface CommandParameters {
    segmentParams?: DataParam;
    data?: DataBody;
}

interface DeleteParameters {
    segmentParams?: DataParam;
}

@Injectable({
    providedIn: "root"
})
export class ApiClientService {

    constructor(private readonly http: HttpClient) { }

    get<T>(
        uriTemplate: string,
        queryParameters?: QueryParameters): Observable<T> {

        const url: string = this.buildUrl(uriTemplate, queryParameters?.segmentParams, queryParameters?.queryParams);
        return this.http.get<T>(url);
    }

    getBlob(
        uriTemplate: string,
        queryParameters?: QueryParameters): Observable<Blob> {

        const url: string = this.buildUrl(uriTemplate, queryParameters?.segmentParams, queryParameters?.queryParams);
        return this.http.get(url, { responseType: "blob" });
    }

    post<T>(
        uriTemplate: string,
        commandParameters?: CommandParameters): Observable<T> {

        const url: string = this.buildUrl(uriTemplate, commandParameters?.segmentParams);
        return this.http.post<T>(url, commandParameters?.data);
    }

    postBlob(
        uriTemplate: string,
        commandParameters?: CommandParameters): Observable<Blob> {

        const url: string = this.buildUrl(uriTemplate, commandParameters?.segmentParams);
        return this.http.post(url, commandParameters?.data, { responseType: "blob" });
    }

    put<T>(
        uriTemplate: string,
        commandParameters?: CommandParameters): Observable<T> {

        const url: string = this.buildUrl(uriTemplate, commandParameters?.segmentParams);
        return this.http.put<T>(url, commandParameters?.data);
    }

    patch<T>(
        uriTemplate: string,
        commandParameters?: CommandParameters): Observable<T> {

        const url: string = this.buildUrl(uriTemplate, commandParameters?.segmentParams);
        return this.http.patch<T>(url, commandParameters?.data);
    }

    delete<T>(
        uriTemplate: string,
        deleteParameters?: DeleteParameters): Observable<T> {

        const url: string = this.buildUrl(uriTemplate, deleteParameters?.segmentParams);
        return this.http.delete<T>(url);
    }

    private buildUrl(
        uriTemplate: string,
        segmentParams?: DataParam,
        queryParams?: DataParam): string {

        this.parseDateValues(segmentParams);
        this.parseDateValues(queryParams);

        if (segmentParams) {
            uriTemplate = URI.expand!(uriTemplate, segmentParams);
        }

        let uri = URI(uriTemplate);

        if (queryParams) {
            uri = uri.query(queryParams);
        }

        return uri.toString();
    }

    private parseDateValues(params: any): void {
        if (!!params) {
            for (const prop in params) {
                if (params[prop]?.constructor === Date) {
                    params[prop] = params[prop].toISOString();
                }
            }
        }
    }
}
