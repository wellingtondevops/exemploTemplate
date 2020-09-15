import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VolumesErrorGuardService {

  constructor(private router: Router) { }

  static isVolumesError() {
    let access = JSON.parse(window.localStorage.getItem('routes'))[0].volumesError;
    return access;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!VolumesErrorGuardService.isVolumesError()) {
      this.router.navigate(['/not-authorized']);
      return false;
    }
    return true;
  }
}
