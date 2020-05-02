import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Register, RegistersList } from '../../models/register';
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RegistersService {

  constructor(
    private http: HttpClient
  ) { }


  listregister(volume, page) {
    if (page) {
      return this.http.get<RegistersList>(`${url}/listregisters?volume=${volume}&_page=${page.pageNumber}&size=10`)
      .pipe(
        tap(data => data)
      );
    } else {
      return this.http.get<RegistersList>(`${url}/listregisters?volume=${volume}&size=10`)
        .pipe(
          tap(data => data)
        );
    }
  }
}
