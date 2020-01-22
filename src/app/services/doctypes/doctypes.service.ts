import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { DoctypeList, Doctype } from 'src/app/models/doctype';
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DoctypesService {

  constructor(
    private http: HttpClient
  ) { }

  doctypes(page) {
    if (page) {
      return this.http.get<DoctypeList>(`${url}/docts?_page=${page.pageNumber}&size=10`)
        .pipe(
          tap(data => data)
        );
    } else {
      return this.http.get<DoctypeList>(`${url}/docts?size=10`)
        .pipe(
          tap(data => data)
        );
    }
  }

  doctype(id) {
    return this.http.get<Doctype>(`${url}/docts/${id}`)
      .pipe(
        tap(data => data)
      );
  }

  newDoctype(doctype) {
    return this.http.post<Doctype>(`${url}/docts/`, doctype).pipe(tap(data => data));
  }

  updateDoctype(doctype) {
    return this.http.patch<Doctype>(`${url}/docts/${doctype._id}`, doctype).pipe(tap(data => data));
  }

  listdocts() {
    return this.http.get<DoctypeList>(`${url}/listdocts`)
      .pipe(
        tap(data => data)
      );
  }

  searchDocts(formdata, page) {
    if (page) {
      return this.http.post<DoctypeList>(`${url}/docts/search?_page=${page.pageNumber}&size=10`, formdata)
      .pipe(
          tap(data => data)
      );
    } else {
      return this.http.post<DoctypeList>(`${url}/docts/search?size=10`, formdata)
      .pipe(
          tap(data => data)
      );
    }
  }
}
