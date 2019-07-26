import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User, UserList } from '../../models/user';
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(
    public http: HttpClient
  ) { }

  users(page) {
    if (page) {
      return this.http.get<UserList>(`${url}/users?_page=${page.pageNumber}`)
      .pipe(
          tap(data => data)
      );
    } else {
      return this.http.get<UserList>(`${url}/users`)
      .pipe(
          tap(data => data)
      );
    }
  }

  deleteUser(user) {
    return this.http.delete<User>(`${url}/users/${user}`)
    .pipe(
      tap(data => data)
    );
  }

  updateUser(user) {
    return this.http.patch<User>(`${url}/users/${user._id}`, user)
    .pipe(
      tap(data => data)
    );
  }

  user(id) {
    return this.http.get<User>(`${url}/users/${id}`)
    .pipe(
        tap(data => data)
    );
  }

  newUser(user) {
    return this.http.post<User>(`${url}/users`, user)
    .pipe(
      tap(data => data)
    );
  }
}
