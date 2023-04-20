import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { switchMapTo } from 'rxjs/operators';
let SampleComponent = class SampleComponent {
    constructor(_sampleService) {
        this._sampleService = _sampleService;
        this.title = 'Sample App';
    }
    addSample(sampleName) {
        this.samples = this._sampleService.addSampleData({ name: sampleName })
            .pipe(switchMapTo(this._sampleService.getSampleData()));
    }
    ngOnInit() {
        this.samples = this._sampleService.getSampleData();
    }
};
SampleComponent = __decorate([
    Component({
        selector: 'app-sample',
        templateUrl: './sample.component.html'
    })
], SampleComponent);
export { SampleComponent };
//# sourceMappingURL=sample.component.js.map