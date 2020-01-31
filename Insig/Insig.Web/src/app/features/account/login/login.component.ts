import { Component } from "@angular/core";
import { AuthService } from "@app/auth";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent {

    constructor(private authService: AuthService) { }

    login(): void {
        this.authService.login();
    }
}
