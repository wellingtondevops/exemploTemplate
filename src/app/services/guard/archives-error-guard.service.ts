import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ArchivesErrorGuardService {

  constructor(private router: Router) {}

    static isArchivesError() {
        let access = JSON.parse(window.localStorage.getItem('routes'))[0].archivesError;
        return access;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!ArchivesErrorGuardService.isArchivesError()) {
            this.router.navigate(['/not-authorized']);
            return false;
        }
        return true;
    }
}
