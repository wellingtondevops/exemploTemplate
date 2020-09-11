import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchivesRegisterGuardService {

  constructor(private router: Router) {}

    static isArchivesRegister() {
        let access = JSON.parse(window.localStorage.getItem('routes'))[0].archivesImport;
        return access;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!ArchivesRegisterGuardService.isArchivesRegister()) {
            this.router.navigate(['/not-authorized']);
            return false;
        }
        return true;
    }
}
