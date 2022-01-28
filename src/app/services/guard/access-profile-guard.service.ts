import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AccessProfileGuardService {

    constructor(private router: Router) { }

    static isAccessProfiles() {
        let access = JSON.parse(window.localStorage.getItem('routes'))[0].accessProfile;
        return access;
    }

    CanActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!AccessProfileGuardService.isAccessProfiles()) {
            this.router.navigate(['/not-authorized']);
            return false;
        }
        return true;
    }
}
