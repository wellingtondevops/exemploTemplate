import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsGuardService {

  constructor(private router: Router) { }

  static isDocuments() {
    let access = JSON.parse(window.localStorage.getItem('routes'))[0].documents;
    return access;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!DocumentsGuardService.isDocuments()) {
      this.router.navigate(['/not-authorized']);
      return false;
    }
    return true;
  }
}
