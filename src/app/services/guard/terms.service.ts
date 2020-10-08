import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TermsService {

  constructor(private router: Router) { }

  static isTerms() {
    const access = JSON.parse(window.localStorage.getItem('acceptanceTerm'));
    return access;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!TermsService.isTerms()) {
      this.router.navigate(['/terms-of-use']);
      return false;
    }
    return true;
  }
}
