import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let ApiSampleService = class ApiSampleService {
    constructor(_apiClientService) {
        this._apiClientService = _apiClientService;
    }
    // Example safe API Call with Segments and Query in URI
    // this.apiClientService.get(`${appConfig.ApiUrl}/values/{id}/samples/{name}`,
    //      {queryParams: { id: 1, name: "test" }, segmentParams: { q1: "ABC!", q2: "z x" }});
    // URI result: "https://localhost:5001/values/1/samples/test?q1=ABC%21&q2=z+x"
    getSampleData() {
        return this._apiClientService.get(`${appConfig.apiUrl}/values/samples`);
    }
    addSampleData(sample) {
        return this._apiClientService.post(`${appConfig.apiUrl}/values/samples`, { data: sample });
    }
};
ApiSampleService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ApiSampleService);
export { ApiSampleService };
//# sourceMappingURL=api-sample.service.js.map