import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User, UserList } from '../../models/user';
import { Profiles } from '../../models/profiles';
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(
    public http: HttpClient
  ) { }

  searchUsers(formData, page) {
   

    if (page) {
      return this.http.post<UserList>(`${url}/users/search?_page=${page.pageNumber}&size=10`, formData)
        .pipe(
          tap(data => data)
        );
    } else {
      return this.http.post<UserList>(`${url}/users/search?size=10`, formData)
        .pipe(
          tap(data => data)
        );
    }
  }

  users(page) {
    if (page) {
      return this.http.get<UserList>(`${url}/users?_page=${page.pageNumber}&size=10`)
      .pipe(
          tap(data => data)
      );
    } else {
      return this.http.get<UserList>(`${url}/users?size=10`)
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

  profiles(){
    return this.http.get<Profiles>(`${url}/profiles/list`)
    .pipe(
      tap(data => data)
    );
  }
}
