import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared/shared.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule { }
