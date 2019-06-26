import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { Company, CompaniesList } from '../../models/company';
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(
    private http: HttpClient
  ) { }

  companies(page) {
    if (page) {
      return this.http.get<CompaniesList>(`${url}/companies?_page=${page.currentPage}`)
      .pipe(
          tap(data => data)
      );
    } else {
      return this.http.get<CompaniesList>(`${url}/companies`)
      .pipe(
          tap(data => data)
      );
    }

  }

  company(id) {
    return this.http.get<Company>(`${url}/companies/${id}`)
    .pipe(
        tap(data => data)
    );
  }
}
