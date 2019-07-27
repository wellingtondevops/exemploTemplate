import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { Company, CompaniesList, CompaniesSearchList } from '../../models/company';
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
      return this.http.get<CompaniesList>(`${url}/companies?_page=${page.pageNumber}`)
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

  searchCompanies() {
    return this.http.get<CompaniesSearchList>(`${url}/listcompanies/`)
    .pipe(
        tap(data => data)
    );
  }

  newCompany(company) {
    return this.http.post<Company>(`${url}/companies`, company)
    .pipe(
      tap(data => data)
    );
  }

  updateCompany(company) {
    return this.http.patch<Company>(`${url}/companies/${company._id}`, company)
    .pipe(
      tap(data => data)
    );
  }
}
