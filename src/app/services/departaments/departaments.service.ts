import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { DepartamentList, Departament } from 'src/app/models/departament';
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DepartamentsService {

  constructor(
    private http: HttpClient
  ) { }

  departaments(page, id) {
    if (id) {
      return this.http.get<DepartamentList>(`${url}/departaments/${id}?_page=${page.pageNumber}&size=10`)
      .pipe(
          tap(data => data)
      );
    } else if (page) {
      return this.http.get<DepartamentList>(`${url}/departaments?_page=${page.pageNumber}&size=10`)
      .pipe(
          tap(data => data)
      );
    }
  }

  departament(id) {
    return this.http.get<Departament>(`${url}/departaments/${id}`)
      .pipe(
          tap(data => data)
      );
  }

  newDepartament(departament) {
    return this.http.post<Departament>(`${url}/departaments`, departament)
    .pipe(
        tap(data => data)
    );
  }

  update(departament) {
    return this.http.patch<Departament>(`${url}/departaments/${departament._id}`, departament)
    .pipe(
        tap(data => data)
    );
  }

  delete(departament) {
    return this.http.delete<Departament>(`${url}/departaments/${departament}`)
    .pipe(
      tap(data => data)
    );
  }

  searchDepartaments(company_id) {
    const urlNew = company_id ? `${url}/listdepartaments?company=${company_id}` : `${url}/listdepartaments`;
    return this.http.get<DepartamentList>(urlNew)
    .pipe(
        tap(data => data)
    );
  }

  searchDepartament(formdata, page) {
    if (page) {
      return this.http.post<DepartamentList>(`${url}/departaments/search?_page=${page.pageNumber}&size=10`, formdata)
      .pipe(
          tap(data => data)
      );
    } else {
      return this.http.post<DepartamentList>(`${url}/departaments/search?size=10`, formdata)
      .pipe(
          tap(data => data)
      );
    }
  }
}
