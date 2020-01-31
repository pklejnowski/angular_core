import { Component, OnInit } from "@angular/core";
import { AuthService } from "@app/auth";
import { Observable } from "rxjs";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
    title = "Sample App";
    authStatus$: Observable<boolean>;
    name: string;

    constructor(private authService: AuthService) { }

    signout(): void {
        this.authService.signout();
    }

    manageAccount(): void {
        this.authService.manageAccount();
    }

    ngOnInit(): void {
        this.authStatus$ = this.authService.authStatus$;
    }

    getUserName(): string {
        return this.authService.name;
    }
}
