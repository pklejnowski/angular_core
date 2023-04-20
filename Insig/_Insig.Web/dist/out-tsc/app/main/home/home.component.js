import { __decorate } from "tslib";
import { Component } from '@angular/core';
const resultCodeDictionary = {
    1: 'Password has been changed successfully',
    2: 'Password change has been canceled'
};
let HomeComponent = class HomeComponent {
    constructor(_route, _toastrService) {
        this._route = _route;
        this._toastrService = _toastrService;
    }
    ngOnInit() {
        const resultCode = +(this._route.snapshot.queryParamMap.get('resultCode') || '');
        switch (resultCode) {
            case 1:
                this._toastrService.success(resultCodeDictionary[resultCode]);
                break;
            case 2:
                this._toastrService.warning(resultCodeDictionary[resultCode]);
                break;
            default:
                break;
        }
    }
};
HomeComponent = __decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.component.html'
    })
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map