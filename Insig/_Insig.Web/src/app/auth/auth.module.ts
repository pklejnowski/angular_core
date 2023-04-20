import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './auth.service';

@NgModule({
    declarations: [
        AuthCallbackComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        MatCardModule
    ]
})
export class AuthModule {
    public static forRoot(): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [AuthService]
        };
    }
}
