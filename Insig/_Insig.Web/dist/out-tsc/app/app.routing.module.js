import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';
const routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'not-found',
        component: PageNotFoundComponent
    },
    {
        path: '**',
        redirectTo: 'not-found',
        pathMatch: 'full'
    }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [
            RouterModule.forRoot(routes)
        ],
        exports: [
            RouterModule
        ]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app.routing.module.js.map