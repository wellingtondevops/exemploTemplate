import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { DepartamentList } from 'src/app/models/departament';
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DepartamentsService {

  constructor(
    private http: HttpClient
  ) { }

  departaments(page, id) {
    if (page) {
      return this.http.get<DepartamentList>(`${url}/departaments/${id}?_page=${page.pageNumber}`)
      .pipe(
          tap(data => data)
      );
    } else {
      return this.http.get<DepartamentList>(`${url}/departaments`)
      .pipe(
          tap(data => data)
      );
    }
  }
}
