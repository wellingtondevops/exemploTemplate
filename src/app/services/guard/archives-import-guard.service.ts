import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchivesImportGuardService {

  constructor(private router: Router) {}

    static isArchivesImport() {
        let access = JSON.parse(window.localStorage.getItem('routes'))[0].archivesImport;
        return access;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!ArchivesImportGuardService.isArchivesImport()) {
            this.router.navigate(['/not-authorized']);
            return false;
        }
        return true;
    }
}
