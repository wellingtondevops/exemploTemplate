import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompaniesGuardService {

  constructor(private router: Router) { }

  static isCompanies() {
    let access = JSON.parse(window.localStorage.getItem('routes'))[0].companies;
    return access;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!CompaniesGuardService.isCompanies()) {
      this.router.navigate(['/not-authorized']);
      return false;
    }
    return true;
  }
}
