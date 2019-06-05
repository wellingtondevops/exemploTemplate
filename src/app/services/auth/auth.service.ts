import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user) {
    return this.http.post<{ email: string, password: string, accessToken: string }>('https://www.archi-api.com/users/authenticate', user)
    .pipe(
        tap(data => window.localStorage.setItem('token', data.accessToken))
    );
  }
}
