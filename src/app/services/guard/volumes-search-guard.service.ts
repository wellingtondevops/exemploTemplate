import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VolumesSearchGuardService {

  constructor(private router: Router) { }

  static isVolumesSearch() {
    let access = JSON.parse(window.localStorage.getItem('routes'))[0].volumesSearch;
    return access;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!VolumesSearchGuardService.isVolumesSearch()) {
      this.router.navigate(['/not-authorized']);
      return false;
    }
    return true;
  }
}
