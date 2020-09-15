import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplatesGuardService {

  constructor(private router: Router) { }

  static isTemplates() {
    let access = JSON.parse(window.localStorage.getItem('routes'))[0].templates;
    return access;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!TemplatesGuardService.isTemplates()) {
      this.router.navigate(['/not-authorized']);
      return false;
    }
    return true;
  }
}
