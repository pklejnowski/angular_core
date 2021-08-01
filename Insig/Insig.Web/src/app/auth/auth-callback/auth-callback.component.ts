import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../auth.service";

@Component({
    selector: "app-auth-callback",
    templateUrl: "./auth-callback.component.html",
    styleUrls: ["auth-callback.component.scss"]
})
export class AuthCallbackComponent implements OnInit {
    error = false;

    constructor(private _authService: AuthService, private _router: Router) { }

    async ngOnInit(): Promise<void> {
        if (this._router.url.indexOf("error") >= 0) {
            this.error = true;
            return;
        }

        await this._authService.completeAuthentication();
    }
}
