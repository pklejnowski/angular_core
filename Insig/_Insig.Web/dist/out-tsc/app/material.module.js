import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
let MaterialModule = class MaterialModule {
};
MaterialModule = __decorate([
    NgModule({
        imports: [
            MatButtonModule,
            MatCardModule,
            MatToolbarModule,
            MatIconModule,
            MatGridListModule,
            MatFormFieldModule,
            MatInputModule,
            MatMenuModule
        ],
        exports: [
            MatButtonModule,
            MatCardModule,
            MatToolbarModule,
            MatIconModule,
            MatGridListModule,
            MatFormFieldModule,
            MatInputModule,
            MatMenuModule
        ]
    })
], MaterialModule);
export { MaterialModule };
//# sourceMappingURL=material.module.js.map