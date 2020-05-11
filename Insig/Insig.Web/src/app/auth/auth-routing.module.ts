import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthCallbackComponent } from "./auth-callback/auth-callback.component";

const routes: Routes = [
    {
        path: "auth-callback",
        component: AuthCallbackComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
