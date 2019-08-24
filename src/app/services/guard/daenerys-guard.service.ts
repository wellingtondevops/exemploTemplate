import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DaenerysGuardService {
    constructor(private router: Router) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!DaenerysGuardService.isDaenerys()) {
            this.router.navigate(['/not-authorized']);
            return false;
        }
        return true;
    }

    static isDaenerys() {
        var access = false;
        JSON.parse(window.localStorage.getItem('profiles')).map(item => {
            if (item === 'DAENERYS') {
                access = true;
            }
        });
        return access;
    }
}
