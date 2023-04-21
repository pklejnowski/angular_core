import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
    constructor(private _authService: AuthService, private _router: Router) { }

    ngOnInit(): void {
        if (this._authService.isAuthenticated()) {
            this._router.navigate(['/']);
        }
    }
}
