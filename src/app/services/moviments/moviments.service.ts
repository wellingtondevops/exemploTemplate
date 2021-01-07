import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User, UserList } from '../../models/user';
import { Profiles } from '../../models/profiles';
import { Moviment, MovimentList } from 'src/app/models/moviment';
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class MovimentsService {

  constructor(public http: HttpClient) { }

  searchMoviments(formData, page) {
    if (page) {
      return this.http.post<MovimentList>(`${url}/demands/search?_page=${page.pageNumber}&size=10`, formData)
      .pipe(
          tap(data => data)
      );
    } else {
      return this.http.post<MovimentList>(`${url}/demands/search?size=10`, formData)
      .pipe(
          tap(data => data)
      );
    }
  }

  moviments(page) {
    if (page) {
      return this.http.get<MovimentList>(`${url}/demands?_page=${page.pageNumber}&size=10`)
      .pipe(
          tap(data => data)
      );
    } else {
      return this.http.get<MovimentList>(`${url}/demands?size=10`)
      .pipe(
          tap(data => data)
      );
    }
  }

  deleteMoviment(user) {
    return this.http.delete<Moviment>(`${url}/demands/${user}`)
    .pipe(
      tap(data => data)
    );
  }

  updateMoviment(user) {
    return this.http.patch<Moviment>(`${url}/demands/${user._id}`, user)
    .pipe(
      tap(data => data)
    );
  }

  moviment(id) {
    return this.http.get<Moviment>(`${url}/demands/${id}`)
    .pipe(
        tap(data => data)
    );
  }

  newMoviment(user) {
    return this.http.post<Moviment>(`${url}/demands`, user)
    .pipe(
      tap(data => data)
    );
  }
}
