import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DaenerysTywinGuardService {
  constructor(private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.isDaenerysOrTywin()) {
        this.router.navigate(['/not-authorized']);
        return false;
    }
    return true;
}

isDaenerysOrTywin() {
    var access = false;
    JSON.parse(window.localStorage.getItem('profiles')).map(item => {
        if (item === 'DAENERYS' || item === 'TYWIN') {
            access = true;
        }
    });
    return access;
}
}
