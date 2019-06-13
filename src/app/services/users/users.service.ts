import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { tap } from 'rxjs/operators';
import { User, UserList } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  users() {
    return this.http.get<UserList>('https://www.archio-api.online/users')
    .pipe(
        tap(data => { return data})
    );
  }

  user(id){
    return this.http.get<User>(`https://www.archio-api.online/users/${id}`)
    .pipe(
        tap(data => { return data })
    );
  }
}
