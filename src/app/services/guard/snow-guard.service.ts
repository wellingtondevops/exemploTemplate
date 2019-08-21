import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnowGuardService {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this.isSnow()) {
          this.router.navigate(['/not-authorized']);
          return false;
      }
      return true;
  }

  isSnow() {
      var access = false;
      JSON.parse(window.localStorage.getItem('profiles')).map(item => {
          if (item === 'SNOW') {
              access = true;
          }
      });
      return access;
  }
}
