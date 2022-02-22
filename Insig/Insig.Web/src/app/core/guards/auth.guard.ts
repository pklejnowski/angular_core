import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@app/auth';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private _router: Router, private _authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this._authService.isAuthenticated$.pipe(
            take(1),
            tap(isAuthenticated => {
                if (!isAuthenticated) {
                    this._router.navigate(['login'], { queryParams: { redirect: state.url }, replaceUrl: true });
                }
            })
        );
    }
}
