import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorehousesGuardService {

  constructor(private router: Router) { }

  static isStorehouses() {
    let access = JSON.parse(window.localStorage.getItem('routes'))[0].storehouses;
    return access;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!StorehousesGuardService.isStorehouses()) {
      this.router.navigate(['/not-authorized']);
      return false;
    }
    return true;
  }
}
