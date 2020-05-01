import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TywinGuardService {
  constructor(private router: Router) {}

  static isTywin() {
      let access = false;
      JSON.parse(window.localStorage.getItem('profiles')).map(item => {
          if (item === 'TYWIN') {
              access = true;
          }
      });
      return access;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!TywinGuardService.isTywin()) {
          this.router.navigate(['/not-authorized']);
          return false;
      }
      return true;
  }
}
