import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersGuardService {

  constructor(private router: Router) { }

  static isUsers() {
    let access = JSON.parse(window.localStorage.getItem('routes'))[0].users;
    return access;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!UsersGuardService.isUsers()) {
      this.router.navigate(['/not-authorized']);
      return false;
    }
    return true;
  }
}
