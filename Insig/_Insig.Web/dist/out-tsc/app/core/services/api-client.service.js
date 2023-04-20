import { __decorate } from "tslib";
import 'urijs/src/URITemplate';
import { Injectable } from '@angular/core';
import * as URI from 'urijs';
let ApiClientService = class ApiClientService {
    constructor(_http) {
        this._http = _http;
    }
    get(uriTemplate, queryParameters) {
        const url = this.buildUrl(uriTemplate, queryParameters === null || queryParameters === void 0 ? void 0 : queryParameters.segmentParams, queryParameters === null || queryParameters === void 0 ? void 0 : queryParameters.queryParams);
        return this._http.get(url);
    }
    getBlob(uriTemplate, queryParameters) {
        const url = this.buildUrl(uriTemplate, queryParameters === null || queryParameters === void 0 ? void 0 : queryParameters.segmentParams, queryParameters === null || queryParameters === void 0 ? void 0 : queryParameters.queryParams);
        return this._http.get(url, { responseType: 'blob' });
    }
    post(uriTemplate, commandParameters) {
        const url = this.buildUrl(uriTemplate, commandParameters === null || commandParameters === void 0 ? void 0 : commandParameters.segmentParams);
        return this._http.post(url, commandParameters === null || commandParameters === void 0 ? void 0 : commandParameters.data);
    }
    postBlob(uriTemplate, commandParameters) {
        const url = this.buildUrl(uriTemplate, commandParameters === null || commandParameters === void 0 ? void 0 : commandParameters.segmentParams);
        return this._http.post(url, commandParameters === null || commandParameters === void 0 ? void 0 : commandParameters.data, { responseType: 'blob' });
    }
    put(uriTemplate, commandParameters) {
        const url = this.buildUrl(uriTemplate, commandParameters === null || commandParameters === void 0 ? void 0 : commandParameters.segmentParams);
        return this._http.put(url, commandParameters === null || commandParameters === void 0 ? void 0 : commandParameters.data);
    }
    patch(uriTemplate, commandParameters) {
        const url = this.buildUrl(uriTemplate, commandParameters === null || commandParameters === void 0 ? void 0 : commandParameters.segmentParams);
        return this._http.patch(url, commandParameters === null || commandParameters === void 0 ? void 0 : commandParameters.data);
    }
    delete(uriTemplate, deleteParameters) {
        const url = this.buildUrl(uriTemplate, deleteParameters === null || deleteParameters === void 0 ? void 0 : deleteParameters.segmentParams);
        return this._http.delete(url);
    }
    buildUrl(uriTemplate, segmentParams, queryParams) {
        this.parseDateValues(segmentParams);
        this.parseDateValues(queryParams);
        if (segmentParams) {
            // URI.expand is never null because URITemplate is imported
            // eslint-disable-next-line
            uriTemplate = URI.expand(uriTemplate, segmentParams);
        }
        let uri = URI(uriTemplate);
        if (queryParams) {
            uri = uri.query(queryParams);
        }
        return uri.toString();
    }
    parseDateValues(params) {
        var _a;
        if (params) {
            /* eslint-disable*/
            for (const prop in params) {
                if (((_a = params[prop]) === null || _a === void 0 ? void 0 : _a.constructor) === Date) {
                    params[prop] = params[prop].toISOString();
                }
            }
            /* eslint-disable*/
        }
    }
};
ApiClientService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ApiClientService);
export { ApiClientService };
//# sourceMappingURL=api-client.service.js.map