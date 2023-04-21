import { Injectable } from '@angular/core';
import { SampleDto } from '@app/features/sample/sample.component';
import { Observable } from 'rxjs';

import { ApiClientService } from './api-client.service';

@Injectable({
    providedIn: 'root'
})
export class ApiSampleService {
    constructor(private _apiClientService: ApiClientService) { }

    // Example safe API Call with Segments and Query in URI
    // this.apiClientService.get(`${appConfig.ApiUrl}/values/{id}/samples/{name}`,
    //      {queryParams: { id: 1, name: "test" }, segmentParams: { q1: "ABC!", q2: "z x" }});
    // URI result: "https://localhost:5001/values/1/samples/test?q1=ABC%21&q2=z+x"

    getSampleData(): Observable<SampleDto[]> {
        return this._apiClientService.get(`${AppConfig.ApiUrl}/values/samples`);
    }

    addSampleData(sample: SampleDto): Observable<SampleDto> {
        return this._apiClientService.post(`${AppConfig.ApiUrl}/values/samples`, { data: sample });
    }
}
