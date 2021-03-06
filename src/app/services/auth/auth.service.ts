import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { Auth } from '../../models/auth';
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(user) {
    return this.http.post<Auth>(`${url}/users/authenticate`, user).pipe(
      tap(data => {
        this.localStorage(data);
        data;
      })
    );
  }

  localStorage(data) {
    window.localStorage.setItem('id', data.id);
    window.localStorage.setItem('email', data.email);
    window.localStorage.setItem('token', data.accessToken);
    window.localStorage.setItem('profiles', JSON.stringify(data.profile));
    window.localStorage.setItem('routes', JSON.stringify(data.routes));
    window.localStorage.setItem('actions', JSON.stringify(data.actions));
    window.localStorage.setItem('userExternal', JSON.stringify(data.userExternal));
    window.localStorage.setItem('acceptanceTerm', JSON.stringify(data.acceptanceTerm));
  }
}
