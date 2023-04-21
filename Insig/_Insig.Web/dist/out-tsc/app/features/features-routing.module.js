import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { SampleComponent } from './sample/sample.component';
const routes = [
    {
        path: 'sample',
        component: SampleComponent,
        canActivate: [AuthGuard]
    }
];
let FeaturesRoutingModule = class FeaturesRoutingModule {
};
FeaturesRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], FeaturesRoutingModule);
export { FeaturesRoutingModule };
//# sourceMappingURL=features-routing.module.js.map