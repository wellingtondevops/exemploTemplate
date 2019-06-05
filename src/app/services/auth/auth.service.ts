import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Auth } from '../../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user) {
    return this.http.post<Auth>('https://www.archi-api.com/users/authenticate', user)
    .pipe(
        tap(data => window.localStorage.setItem('token', data.accessToken))
    );
  }
}
