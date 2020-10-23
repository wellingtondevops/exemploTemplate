import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchivesShowGuardService {

  constructor(private router: Router) {}

    static isArchivesShow() {
        let access = JSON.parse(window.localStorage.getItem('routes'))[0].archivesShow;
        return access;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!ArchivesShowGuardService.isArchivesShow()) {
            this.router.navigate(['/not-authorized']);
            return false;
        }
        return true;
    }
}
