import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VolumesShowGuardService {

  constructor(private router: Router) { }

  static isVolumesShow() {
    let access = JSON.parse(window.localStorage.getItem('routes'))[0].volumesShow;
    return access;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!VolumesShowGuardService.isVolumesShow()) {
      this.router.navigate(['/not-authorized']);
      return false;
    }
    return true;
  }
}
