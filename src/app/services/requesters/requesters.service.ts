import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Requester, RequesterList, RequesterSearchList } from '../../models/requester';
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RequestersService {

  constructor(
    private http: HttpClient
  ) { }

  requesters(page) {
    if (page) {
      return this.http.get<RequesterList>(`${url}/users/requesters?_page=${page.pageNumber}&size=10`)
        .pipe(
          tap(data => data)
        );
    } else {
      return this.http.get<RequesterList>(`${url}/users/requesters?size=10`)
        .pipe(
          tap(data => data)
        );
    }
  }

  newRequester(storeHouse) {
    return this.http.post<Requester>(`${url}/users/requesters`, storeHouse)
      .pipe(
        tap(data => data)
      );
  }

  requester(id) {
    return this.http.get<Requester>(`${url}/users/requesters/${id}`)
      .pipe(
        tap(data => data)
      );
  }

  deleteRequester(id) {
    return this.http.delete<Requester>(`${url}/users/requesters/${id}`)
      .pipe(
        tap(data => data)
      );
  }

  updateRequester(requester) {
    return this.http.patch<Requester>(`${url}/users/requesters/${requester._id}`, requester)
      .pipe(
        tap(data => data)
      );
  }

  searchRequesters(formdata, page) {
    if (page) {
      return this.http.post<RequesterSearchList>(`${url}/users/requesters/search?_page=${page.pageNumber}&size=10`, formdata)
        .pipe(
          tap(data => data)
        );
    } else {
      return this.http.post<RequesterSearchList>(`${url}/users/requesters/search?size=10`, formdata)
        .pipe(
          tap(data => data)
        );
    }
  }

  listRequesterByCompany(company) {
    return this.http.get<RequesterSearchList>(`${url}/listrequesters?company=${company}`)
      .pipe(
        tap(data => data)
      );
  }
}
