import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchivesSearchGuardService {

  constructor(private router: Router) {}

    static isArchivesSearch() {
        let access = JSON.parse(window.localStorage.getItem('routes'))[0].archivesSearch;
        console.log(access)
        return access;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!ArchivesSearchGuardService.isArchivesSearch()) {
            this.router.navigate(['/not-authorized']);
            return false;
        }
        return true;
    }
}
