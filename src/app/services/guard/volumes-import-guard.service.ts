import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VolumesImportGuardService {

  constructor(private router: Router) { }

  static isVolumesImport() {
    let access = JSON.parse(window.localStorage.getItem('routes'))[0].volumesImport;
    return access;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!VolumesImportGuardService.isVolumesImport()) {
      this.router.navigate(['/not-authorized']);
      return false;
    }
    return true;
  }
}
