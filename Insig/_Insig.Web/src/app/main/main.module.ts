import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeaturesModule } from '@app/features/features.module';
import { MaterialModule } from '@app/material.module';

import { HomeComponent } from './home/home.component';
import { MainRoutingModule } from './main-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
    imports: [
        CommonModule,
        MainRoutingModule,
        MaterialModule,
        FeaturesModule
    ],
    declarations: [
        NavbarComponent,
        HomeComponent,
        PageNotFoundComponent
    ],
    exports: [
        NavbarComponent,
        HomeComponent,
        PageNotFoundComponent
    ]
})
export class MainModule { }
