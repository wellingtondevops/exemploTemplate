import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentsGuardService {

  constructor(private router: Router) { }

  static isDepartaments() {
    let access = JSON.parse(window.localStorage.getItem('routes'))[0].departaments;
    return access;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!DepartamentsGuardService.isDepartaments()) {
      this.router.navigate(['/not-authorized']);
      return false;
    }
    return true;
  }
}
